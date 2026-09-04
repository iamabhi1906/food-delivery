import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderModule } from "./order/order.module.js";
import { OrderOrmConfig } from "./database/config/orm.config.js";

@Module({
	imports: [TypeOrmModule.forRootAsync(OrderOrmConfig), OrderModule],
	exports: [OrderModule],
})
export class OrdersModule {}
