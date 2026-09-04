import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./entity/order.entity.js";
import { OrderController } from "./controller/order.controller.js";
import { OrderService } from "./service/order.service.js";

@Module({
	imports: [TypeOrmModule.forFeature([OrderEntity], "orders")],
	controllers: [OrderController],
	providers: [OrderService],
	exports: [OrderService],
})
export class OrderModule {}
