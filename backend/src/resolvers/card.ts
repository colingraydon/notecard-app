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
  @Field()
  subId: number;
}

@ObjectType()
class CardResponse {
  //set the type
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Card, { nullable: true })
  card?: Card;
}

@Resolver(Card)
export class CardResolver {
  //creates a card, uses middleware to check auth
  @Mutation(() => CardResponse)
  @UseMiddleware(isAuthenticated)
  async createCard(
    @Arg("input") input: CardInput,
    @Ctx() { req }: Context
  ): Promise<CardResponse> {
    if (input.title.length === 0) {
      return {
        errors: [
          {
            message: "front cannot be empty",
            field: "title",
          },
        ],
      };
    }
    if (input.title.length > 500) {
      return {
        errors: [
          {
            message: "must have 500 or fewer characters",
            field: "title",
          },
        ],
      };
    }
    if (input.text.length === 0) {
      return {
        errors: [
          {
            message: "back cannot be empty",
            field: "text",
          },
        ],
      };
    }
    if (input.text.length > 1000) {
      return {
        errors: [
          {
            message: "must have 1000 or fewer characters",
            field: "text",
          },
        ],
      };
    }

    if (input.subId === 0) {
      return {
        errors: [
          {
            message: "please select a subject",
            field: "subId",
          },
        ],
      };
    }
    const rawSubj = await Subject.find({ where: { id: input.subId } });
    const subj = rawSubj[0];

    const cardRepository = dataSource.getRepository(Card);
    const card = new Card();
    card.text = input.text;
    card.title = input.title;
    card.subject = subj;
    card.creatorId = req.session.userId as number;
    cardRepository.save(card);
    return { card };
  }

  //queries and returns a nullable card by card.id
  @Query(() => Card, { nullable: true })
  card(@Arg("id", () => Int) cardId: number): Promise<Card | null> {
    return Card.findOne({ where: { cardId } });
  }

  @Mutation(() => Card, { nullable: true })
  @UseMiddleware(isAuthenticated)
  async updateCard(
    @Arg("cardId", () => Int) cardId: number,
    @Arg("text") text: string,
    @Arg("title") title: string,
    @Ctx() { req }: Context
  ): Promise<Card | null> {
    //fetches and updates post with query builder
    //returning line will return the post that is beign updated
    const post = await dataSource
      .createQueryBuilder()
      .update(Card)
      .set({ title: title, text: text })
      .where('cardId = :cardId and "creatorId" = :creatorId', {
        cardId,
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
  async deleteCard(@Arg("cardId", () => Int) cardId: number): Promise<boolean> {
    await Card.delete({ cardId });
    return true;
  }
}
