import { Resolver } from "type-graphql";
import { Card } from "../entities/Card";

// @InputType()
// class CardInput {
//   @Field()
//   title: string;
//   @Field()
//   text: string;
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
  // @Query(() => PaginatedCards)
  // async cards(
  //     @Ctx() {}: SessionContext
  // ): Promise<Card> {} {
  //     return Card.find({ where: {id}})
  // }
}
