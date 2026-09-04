import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationEntity } from "./entity/notification.entity.js";
import { NotificationController } from "./controller/notification.controller.js";
import { NotificationService } from "./service/notification.service.js";

@Module({
	imports: [TypeOrmModule.forFeature([NotificationEntity], "notifications")],
	controllers: [NotificationController],
	providers: [NotificationService],
	exports: [NotificationService],
})
export class NotificationModule {}
