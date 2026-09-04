import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { OrderOrmConfig } from "./infrastructure/database/config/orm.config.js";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRootAsync(OrderOrmConfig)],
})
export class OrdersModule {}
