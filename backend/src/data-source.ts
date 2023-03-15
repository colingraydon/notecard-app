import { DataSource } from "typeorm";
import { Card } from "./entities/Card";
import { Subject } from "./entities/Subject";
import { User } from "./entities/User";
import { Notification } from "./entities/Notification";
import "dotenv/config";
import path from "path";

export const dataSource = new DataSource({
  type: "postgres",
  database: "notecard-app",
  username: "postgres",
  password: "postgres",
  url: process.env.DATABASE_URL,
  logging: true,
  //creates tables automatically, no need for running a migration
  synchronize: true,
  //running mock migration
  migrations: [path.join(__dirname, "./migrations/*")],
  entities: [Card, User, Subject, Notification],
});
