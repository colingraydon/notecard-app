import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Card } from "./Card";
import { User } from "./User";

@ObjectType()
@Entity()
export class Subject extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.subjects, {
    onDelete: "CASCADE",
  })
  creator!: User;

  @Field()
  @Column()
  creatorId!: number;

  @Field(() => [Card])
  @OneToMany(() => Card, (card) => card.subject, {
    cascade: true,
    eager: true,
  })
  cards!: Card[];
}
