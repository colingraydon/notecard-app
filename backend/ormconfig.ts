export default {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "notecard-app2",
  entities: ["dist/entities/*.js"],
  migrations: ["dist/migrations/*.js"],
};
