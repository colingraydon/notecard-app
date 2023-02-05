import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Subject } from "./Subject";

@ObjectType()
@Entity()
export class Card extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  creatorId!: number;

  @Field()
  @ManyToOne(() => Subject, (subject) => subject.cards)
  subject: Subject;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  text!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;
}
