import { Subject } from "../entities/Subject";
import {
  Query,
  Arg,
  Int,
  Resolver,
  Ctx,
  Mutation,
  UseMiddleware,
} from "type-graphql";
import { User } from "../entities/User";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { Context } from "../types";
import { dataSource } from "../data-source";

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
  @Mutation(() => Subject)
  @UseMiddleware(isAuthenticated)
  async createSubject(
    @Arg("input") input: string,
    @Ctx() { req }: Context
  ): Promise<Subject> {
    const user = await User.find({ where: { id: req.session.userId } });
    const user1 = user[0];
    return Subject.create({
      name: input,
      creator: user1,
      creatorId: req.session.userId,
    }).save();
  }

  @Query(() => [Subject], { nullable: true })
  @UseMiddleware(isAuthenticated)
  async getSubjects(@Ctx() { req }: Context): Promise<Subject[] | undefined> {
    return Subject.find({ where: { creatorId: req.session.userId } });
  }

  //   //@TODO implement cascading for deleting associated cards
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
