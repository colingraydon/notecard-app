import {
  Arg,
  Ctx,
  Field,
  InputType,
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

@InputType()
class SubjectInput {
  @Field()
  prevScore: number;
  @Field()
  prevTime: number;
  @Field()
  id: number;
  @Field()
  name: String;
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
    if (input.length > 30) {
      return {
        errors: [
          {
            message: "subject must have 30 or fewer characters",
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
    subj.save();
    console.log("subj from resolver: ", subj);
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

  @Mutation(() => Subject)
  @UseMiddleware(isAuthenticated)
  async updateSubject(
    @Arg("input") input: SubjectInput,
    @Ctx() { req }: Context
  ): Promise<Subject | null> {
    const subj = await dataSource
      .createQueryBuilder()
      .update(Subject)
      .set({
        name: input.name,
        prevScore: input.prevScore,
        prevTime: input.prevTime,
      })
      .where('id = :id and "creatorId" = :creatorId', {
        id: input.id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();

    return subj.raw[0];
  }

  @Mutation(() => Subject)
  @UseMiddleware(isAuthenticated)
  async updateSubjectName(
    @Arg("name") name: string,
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: Context
  ): Promise<Subject | null> {
    const subj = await dataSource
      .createQueryBuilder()
      .update(Subject)
      .set({
        name: name,
      })
      .where('id = :id and "creatorId" = :creatorId', {
        id: id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();

    return subj.raw[0];
  }
}
