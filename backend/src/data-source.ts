import { DataSource } from "typeorm";
import { Card } from "./entities/Card";
import { Subject } from "./entities/Subject";
import { User } from "./entities/User";
import { Notification } from "./entities/Notification";
import "dotenv/config";
import path from "path";

export const dataSource = new DataSource({
  type: "postgres",
  //added
  // host: "127.0.0.1",
  port: 5432,
  //might be wrong
  host: "postgres",
  // host: "postgres",
  database: "postgres",
  username: "postgres",
  password: "postgres",
  // url: process.env.DATABASE_URL,
  logging: true,
  //creates tables automatically, no need for running a migration
  synchronize: true,
  //running mock migration
  migrations: [path.join(__dirname, "./migrations/*")],
  entities: [Card, User, Subject, Notification],
});
