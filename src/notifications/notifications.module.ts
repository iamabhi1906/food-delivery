import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationModule } from "./notification/notification.module.js";
import { NotificationOrmConfig } from "./database/config/orm.config.js";

@Module({
	imports: [TypeOrmModule.forRootAsync(NotificationOrmConfig), NotificationModule],
	exports: [NotificationModule],
})
export class NotificationsModule {}
