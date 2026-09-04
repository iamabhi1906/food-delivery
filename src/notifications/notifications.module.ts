import { Module } from "@nestjs/common";
import { NotificationOrmConfig } from "./infrastructure/database/config/orm.config.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRootAsync(NotificationOrmConfig)],
})
export class NotificationsModule {}
