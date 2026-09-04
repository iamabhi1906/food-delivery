import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserOrmConfig } from "./infrastructure/database/config/orm.config.js";

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRootAsync(UserOrmConfig)],
})
export class UsersModule {}
