import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";

export const OrderOrmConfig: TypeOrmModuleAsyncOptions = {
	name: "orders",
	inject: [ConfigService],

	useFactory: (config: ConfigService) => ({
		type: "postgres",

		host: config.get<string>("POSTGRES_HOST"),
		port: config.get<number>("POSTGRES_PORT"),

		username: config.get<string>("POSTGRES_USER"),
		password: config.get<string>("POSTGRES_PASSWORD"),
		database: config.get<string>("POSTGRES_DB"),

		schema: "orders",

		autoLoadEntities: true,

		migrations: ["dist/orders/database/migrations/*.js"],

		logging: true,
		migrationsRun: false,
		synchronize: false,
	}),
};
