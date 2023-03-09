import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { dataSource } from "../data-source";
import { Notification } from "../entities/Notification";
import { User } from "../entities/User";
import { Context } from "../types";
import { FieldError } from "./user";

@ObjectType()
class NotificationResponse {
  //set the type
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Notification, { nullable: true })
  notification?: Notification;
}
@Resolver(Notification)
export class NotificationResolver {
  @Query(() => Notification, { nullable: true })
  notification(
    @Arg("id", () => Int) id: number
  ): Promise<Notification[] | null> {
    return Notification.find({ where: { id } });
  }

  @Mutation(() => Notification)
  async createNotification(
    @Arg("text") text: string,
    @Arg("read") read: boolean,
    @Ctx() { req }: Context
  ): Promise<Notification> {
    const userRepository = dataSource.getRepository(User);
    const notificationRepository = dataSource.getRepository(Notification);
    let user = await userRepository.find({
      where: { id: req.session.userId },
    });
    let notification = new Notification();

    const realUser = user[0];

    notification.text = text;
    notification.owner = realUser;
    notification.creatorId = realUser.id;
    notification.read = read;
    // notification.creatorId = user[0].id;

    notification = await notificationRepository.save(notification);

    return notification;
  }

  //currently updating notification but not returning a notification if no error, just returns null
  @Mutation(() => NotificationResponse)
  async updateNotification(
    @Arg("id", () => Int) id: number,
    @Arg("read") read: boolean,
    @Ctx() { req }: Context
  ): Promise<NotificationResponse> {
    const notification = await dataSource
      .createQueryBuilder()
      .update(Notification)
      .set({
        read: read,
      })
      .where("id = :id", {
        id: id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();

    if (notification.raw.length < 1) {
      return {
        errors: [
          {
            message: "notification id not found",
            field: "notification",
          },
        ],
      };
    }
    return notification.raw[0];
  }

  @Mutation(() => Boolean)
  async deleteNotification(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Notification.delete({ id: id });
    return true;
  }

  @Query(() => [Notification], { nullable: true })
  async getNotifications(
    @Ctx() { req }: Context
  ): Promise<Notification[] | undefined> {
    const data = await Notification.find({
      where: { creatorId: req.session.userId },
      order: { id: "DESC" },
    });
    return data;
  }
}
