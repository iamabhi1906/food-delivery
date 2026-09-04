import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { join } from "node:path";

export const UserOrmConfig: TypeOrmModuleAsyncOptions = {
	inject: [ConfigService],
	useFactory: (config: ConfigService) => ({
		type: "postgres",
		host: config.get<string>("POSTGRES_HOST"),
		port: config.get<number>("POSTGRES_PORT"),
		schema: "users",
		username: config.get<string>("POSTGRES_USER"),
		password: config.get<string>("POSTGRES_PASSWORD"),
		database: config.get<string>("POSTGRES_DATABASE"),
		entities: [join(__dirname, "..", "..", "**", "*.entity.{js}")],
		migrations: [join(__dirname, "..", "migrations", "*.{js}")],

		logging: true,
		migrationsRun: false,
		synchronize: false,
	}),
};
