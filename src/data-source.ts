import { DataSource, type DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const MODULES = ["orders", "notification"] as const;
type ModuleName = (typeof MODULES)[number];
function getModuleFromEnv(): ModuleName | undefined {
	const matched = MODULES.filter((mod) => process.env[`npm_config_${mod}`] === "true");
	if (matched.length > 1)
		throw new Error(`Multiple module flags passed: ${matched.join(", ")}. Pass only one, e.g. --orders`);
	return matched[0];
}

const moduleName = getModuleFromEnv();
const migrations = [`dist/${moduleName}/database/migrations/*.{ts,js}`];
const entities = [`dist/${moduleName}/entities/*.entity.{ts,js}`];

export const dataSourceOptions: DataSourceOptions = {
	type: "postgres",
	host: process.env.POSTGRES_HOST,
	port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	synchronize: false,
	entities: entities,
	migrations: migrations,
	migrationsTableName: "migrations",
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
