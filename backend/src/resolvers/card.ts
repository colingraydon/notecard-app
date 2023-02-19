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
import { Card } from "../entities/Card";
import { Subject } from "../entities/Subject";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { Context } from "../types";
import { FieldError } from "./user";

@InputType()
class CardInput {
  @Field()
  title: string;
  @Field()
  text: string;
}

@ObjectType()
class CardResponse {
  //set the type
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Card, { nullable: true })
  card?: Card;
}

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
  @Mutation(() => CardResponse)
  @UseMiddleware(isAuthenticated)
  async createCard(
    @Arg("input") input: CardInput,
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: Context
  ): Promise<CardResponse> {
    if (input.text.length === 0) {
      return {
        errors: [
          {
            message: "back cannot be empty",
            field: "back",
          },
        ],
      };
    }
    if (input.title.length === 0) {
      return {
        errors: [
          {
            message: "front cannot be empty",
            field: "front",
          },
        ],
      };
    }
    if (id === null) {
      return {
        errors: [
          {
            message: "please select a subject",
            field: "front",
          },
        ],
      };
    }
    const rawSubj = await Subject.find({ where: { id } });
    const subj = rawSubj[0];
    const card = Card.create({
      id,
      text: input.text,
      title: input.title,
      creatorId: req.session.userId as number,
      subject: subj,
    });
    console.log("card: ", card);
    card.save();
    // const cardRepository = dataSource.getRepository(Card);
    // const card = new Card();
    // card.text = input.text;
    // card.title = input.title;
    // card.subject = subj;
    // card.creatorId = req.session.userId as number;
    // cardRepository.save(card);

    return { card };
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
