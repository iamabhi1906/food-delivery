import "reflect-metadata";
import { DataSource, type DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { OrderEntity } from "../order/entity/order.entity.js";

dotenv.config();

export const ordersDataSourceOptions: DataSourceOptions = {
	type: "postgres",
	host: process.env.POSTGRES_HOST,
	port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	schema: "orders",
	synchronize: false,
	entities: [OrderEntity],
	migrations: ["dist/orders/database/migrations/*{.js,.cjs}"],
	migrationsTableName: "migrations",
};

const ordersDataSource = new DataSource(ordersDataSourceOptions);
export default ordersDataSource;
