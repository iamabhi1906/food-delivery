import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module.js";
import { OrdersModule } from "./orders/orders.module.js";
import { NotificationsModule } from "./notifications/notifications.module.js";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		UsersModule,
		OrdersModule,
		NotificationsModule,
	],
})
export class AppModule {}
