import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { dataSource } from "../data-source";
import { Subject } from "../entities/Subject";
import { User } from "../entities/User";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { Context } from "../types";
import { FieldError } from "./user";

@ObjectType()
class SubjectResponse {
  //set the type
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Subject, { nullable: true })
  subject?: Subject;
}
@Resolver(Subject)
export class SubjectResolver {
  //queries and the Subject array for a user
  @Query(() => Subject, { nullable: true })
  subject(@Arg("id", () => Int) id: number): Promise<Subject[] | null> {
    return Subject.find({ where: { id } });
  }

  //creates a subject in the subject table.
  //finds user by cookie, checks authentication, that user owns the subject
  //move this to user resolver class and refactor?
  @Mutation(() => SubjectResponse)
  @UseMiddleware(isAuthenticated)
  async createSubject(
    @Arg("input") input: string,
    @Ctx() { req }: Context
  ): Promise<SubjectResponse> {
    // const user = await User.find({ where: { id: req.session.userId } });
    // const user1 = user[0];
    // const subjects: Subject[] =
    //   typeof user1.subjects === "undefined" ? [] : user1.subjects;
    // // const subj = Subject.create({
    // //   name: input,
    // //   creator: user1,
    // //   creatorId: req.session.userId,
    // // });

    // const subj = Subject.create({
    //   creator: user1,
    //   creatorId: req.session.userId,
    //   name: input,
    // });
    // // console.log("subj: ", subj);
    // subjects.push(subj);
    // console.log("subjects: ", subjects);

    // // console.log("req.session.userId: ", req.session.userId);
    // return dataSource
    //   .createQueryBuilder()
    //   .update(User)
    //   .set({ subjects: subjects })
    //   .where("id = :id", { id: req.session.userId })
    //   .execute();

    if (input.length === 0) {
      return {
        errors: [
          {
            message: "subject cannot be empty",
            field: "subject",
          },
        ],
      };
    }
    const rawUser = await User.find({ where: { id: req.session.userId } });
    const user = rawUser[0];
    const subj = Subject.create({
      name: input,
      ...user,
      creatorId: req.session.userId,
    });
    console.log("subj: ", subj);
    subj.save();
    return { subject: subj };
  }

  @Query(() => [Subject], { nullable: true })
  @UseMiddleware(isAuthenticated)
  async getSubjects(@Ctx() { req }: Context): Promise<Subject[] | undefined> {
    return Subject.find({ where: { creatorId: req.session.userId } });
  }

  //   //deletes a single subject, checks that user is logged in
  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async deleteSubject(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: Context
  ): Promise<boolean> {
    await Subject.delete({ creatorId: req.session.userId, id: id });
    return true;
  }

  //updates a subject's name. checks auth.
  @Mutation(() => Subject)
  @UseMiddleware(isAuthenticated)
  async updateSubject(
    @Arg("id", () => Int) id: number,
    @Arg("name") name: string,
    @Ctx() { req }: Context
  ): Promise<Subject | null> {
    const subj = await dataSource
      .createQueryBuilder()
      .update(Subject)
      .set({ name })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();

    return subj.raw[0];
  }
}
