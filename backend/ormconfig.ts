export default {
  type: "postgres",
  //changed from localhost
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "postgres",
  //changed from notecard-app
  database: "postgres",
  entities: ["dist/entities/*.js"],
  migrations: ["dist/migrations/*.js"],
};
