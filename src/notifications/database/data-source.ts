import "reflect-metadata";
import { DataSource, type DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { NotificationEntity } from "../notification/entity/notification.entity.js";

dotenv.config();

export const notificationsDataSourceOptions: DataSourceOptions = {
	type: "postgres",
	host: process.env.POSTGRES_HOST,
	port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	schema: "notifications",
	synchronize: false,
	entities: [NotificationEntity],
	migrations: ["dist/notifications/database/migrations/*{.js,.cjs}"],
	migrationsTableName: "migrations",
};

const notificationsDataSource = new DataSource(notificationsDataSourceOptions);
export default notificationsDataSource;
