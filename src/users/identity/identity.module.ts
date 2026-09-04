import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity.js";

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity], "users")],
	exports: [TypeOrmModule],
})
export class IdentityModule {}
