import argon2 from "argon2";
import { sendEmail } from "../utils/sendEmail";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { v4 } from "uuid";
import { COOKIENAME } from "../constants";
import { dataSource } from "../data-source";
import { User } from "../entities/User";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { Context } from "../types";
import { validateRegister } from "../utils/validateRegister";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { FORGET_PASSWORD_PREFIX } from "../constants";

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  //this error will be displayed in the UI
  @Field()
  message: string;
}

//return object types from mutations, input types used for arguments
//User response will return an user or an error.
@ObjectType()
class UserResponse {
  //set the type
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

/*This will return a user response. The arguments passed in will be validated
based on validation logic. Errors may be returned. If not, the password will
be hashed and a user will be inserted. The cookie will be set and the user returned */
@Resolver(User)
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Ctx() { req }: Context,
    @Arg("options") options: UsernamePasswordInput
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user;

    try {
      const result = await dataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: options.username,
          password: hashedPassword,
          email: options.email,
        })
        .returning("*")
        .execute();
      user = result.raw[0];
    } catch (err) {
      //code taken from stack trace
      if (err.code === "23505" || err.detail.includes("already exists")) {
        //dupe username error
        return {
          errors: [
            {
              message: "username or email already exists",
              field: "username",
            },
          ],
        };
      }
    }

    //sets cookie
    req.session.userId = user.id;
    return { user };
  }

  //Login mutation. Will return a UserResponse and set cookie
  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    //@ is disallowed for usernames and mandatory in emails.
    let user;
    if (usernameOrEmail.includes("@")) {
      user = await User.findOne({ where: { email: usernameOrEmail } });
    } else {
      user = await User.findOne({ where: { username: usernameOrEmail } });
    }

    //logic if no user found, with FieldError returned
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "That username or email does not exist",
          },
        ],
      };
    }

    //checks pw
    const valid = await argon2.verify(user.password, password);
    //logic and fieldError for bad pw/username combo
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Invalid login.",
          },
        ],
      };
    }

    req.session!.userId = user.id;
    return {
      user,
    };
  }

  /*Logout mutation. Will destroy the session via a callback function provided by 
  redis. Also will destroy the cookie */
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: Context) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIENAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, req }: Context
  ): Promise<UserResponse> {
    if (newPassword.length < 5) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "Password must be 5 characters or longer",
          },
        ],
      };
    }
    //get userID from redis
    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "expired token",
          },
        ],
      };
    }

    const userIdNum = parseInt(userId);
    //get current user, lookup by userId
    //need to parse int to type match int to str
    const user = await User.findOne({ where: { id: userIdNum } });

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "user no longer exists",
          },
        ],
      };
    }

    //apply hashing logic, run update sql
    User.update(
      { id: userIdNum },
      {
        password: await argon2.hash(newPassword),
      }
    );

    //delete the token
    await redis.del(key);
    //loginuser after setting password
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string, @Ctx() { redis }: Context) {
    // const user = await em.findOne(User, {email});
    const user = await User.findOne({ where: { email } });
    //email not in DB
    if (!user) {
      //returning true will not allow a request to determine if there is a particular email in db
      return true;
    }

    //generates token from uuid
    const token = v4();

    //redis stuff here
    //wrapped in try/catch because it was not working
    try {
      await redis.set(
        FORGET_PASSWORD_PREFIX + token,
        user.id,
        "EX",
        1000 * 60 * 60 * 24 * 4
      );
    } catch (error) {
      console.log(error);
    }
    //anchor tag to send in email, provides a token

    await sendEmail(
      email,
      `<a href="${process.env.CORS_ORIGIN}/change-password/${token}">resetpassword</a>`
    );
    return true;
  }
  //Returns user based on cookie
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: Context) {
    if (!req.session.userId) {
      return null;
    }
    return User.findOne({ where: { id: req.session.userId } });
  }

  //Returns user based on cookie
  @Query(() => User, { nullable: true })
  meEmail(@Ctx() { req }: Context) {
    if (!req.session.userId) {
      return null;
    }
    return User.findOne({ where: { id: req.session.userId } });
  }
  //   //deletes the user's account
  //   //deleting a card, cascading not implemented yet
  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async deleteUser(@Ctx() { req }: Context): Promise<boolean> {
    await User.delete({ id: req.session.userId });
    return true;
  }

  //gets a user's subject list, checks auth status
  //   @Query(() => [Subject], { nullable: true })
  //   @UseMiddleware(isAuthenticated)
  //   async getSubjects(@Ctx() { req }: Context): Promise<Subject[] | undefined> {
  //     return Subject.find({ where: { creatorId: req.session.userId } });
  //   }
}
