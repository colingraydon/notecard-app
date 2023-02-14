import { Subject } from "../entities/Subject";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { dataSource } from "../data-source";
import { Card } from "../entities/Card";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { Context } from "../types";

@InputType()
class CardInput {
  @Field()
  title: string;
  @Field()
  text: string;
}

// @InputType()
// class SubjectInput {
//   @Field()
//   title: string;
// }

//to be used in the delete mutation
// @ObjectType()
// class DeleteResponse {
//   @Field(() => Boolean, { nullable: true })
//   errors?: boolean;

//   @Field(() => String, { nullable: true })
//   response?: string;
// }
// @ObjectType()
// class PaginatedCards {
//   @Field(() => [Card])
//   cards: Card[];
//   @Field()
//   hasMore: boolean;
// }

@Resolver(Card)
export class CardResolver {
  //   @Query(() => PaginatedCards)
  //   async cards(
  //       @Ctx() {}: Context
  //   ): Promise<Card> {} {
  //       return Card.find({ where: {id}})
  //   }

  //creates a card, uses middleware to check auth
  @Mutation(() => Card)
  @UseMiddleware(isAuthenticated)
  async createCard(
    @Arg("text") text: string,
    @Arg("title") title: string,
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: Context
  ): Promise<Card> {
    const subj = await Subject.find({ where: { id } });
    const subj1 = subj[0];

    // return dataSource.createQueryBuilder().insert().into(Card).values({
    //   creatorId: req.session.userId,
    //   subject: subj1,
    //   title: title,
    //   text: text,
    // });
    const cardRepository = dataSource.getRepository(Card);

    console.log("subject: ", subj1);

    const card = new Card();
    card.text = text;
    card.title = title;
    card.subject = subj1;
    card.creatorId = req.session.userId as number;
    return cardRepository.save(card);

    // return Card.create({
    //   ...subj1,
    //   title: title,
    //   text: text,
    // }).save();

    // return Subject.create({
    //   name: input,
    //   creator: user,
    //   creatorId: req.session.userId,
    // }).save();
  }

  //queries and returns a nullable card by card.id
  @Query(() => Card, { nullable: true })
  card(@Arg("id", () => Int) id: number): Promise<Card | null> {
    return Card.findOne({ where: { id } });
  }

  @Mutation(() => Card, { nullable: true })
  @UseMiddleware(isAuthenticated)
  async updateCard(
    @Arg("id", () => Int) id: number,
    @Arg("title") title: string,
    @Arg("text") text: string,
    @Ctx() { req }: Context
  ): Promise<Card | null> {
    //fetches and updates post with query builder
    //returning line will return the post that is beign updated
    const post = await dataSource
      .createQueryBuilder()
      .update(Card)
      .set({ title, text })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();

    //post will have a raw array of elements, first element is needed
    return post.raw[0];
  }

  //deleting a card, cascading not implemented yet
  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async deleteCard(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: Context
  ): Promise<boolean> {
    await Card.delete({ id, creatorId: req.session.userId });
    return true;
  }
}
