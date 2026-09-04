import "reflect-metadata";
import { DataSource, type DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { UserEntity } from "../identity/entity/user.entity.js";

dotenv.config();

export const usersDataSourceOptions: DataSourceOptions = {
	type: "postgres",
	host: process.env.POSTGRES_HOST,
	port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,

	schema: "users",

	synchronize: false,

	entities: [UserEntity],

	migrations: ["dist/users/database/migrations/*{.js,.cjs}"],

	migrationsTableName: "migrations",
};

const usersDataSource = new DataSource(usersDataSourceOptions);
export default usersDataSource;
