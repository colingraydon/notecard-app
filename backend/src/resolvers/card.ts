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
import { Subject } from "../entities/Subject";
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
    @Arg("input") input: CardInput,
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: Context
  ): Promise<Card> {
    const rawSubj = await Subject.find({ where: { id } });
    const subj = rawSubj[0];
    const cardRepository = dataSource.getRepository(Card);

    const card = new Card();
    card.text = input.text;
    card.title = input.title;
    card.subject = subj;
    card.creatorId = req.session.userId as number;
    return cardRepository.save(card);
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
    @Arg("input") input: CardInput,
    @Ctx() { req }: Context
  ): Promise<Card | null> {
    //fetches and updates post with query builder
    //returning line will return the post that is beign updated
    const post = await dataSource
      .createQueryBuilder()
      .update(Card)
      .set({ title: input.title, text: input.text })
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
  async deleteCard(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Card.delete({ id });
    return true;
  }
}
