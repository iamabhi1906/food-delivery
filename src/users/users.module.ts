import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IdentityModule } from "./identity/identity.module.js";
import { UserModule } from "./user/user.module.js";
import { UserOrmConfig } from "./database/config/orm.config.js";

@Module({
	imports: [TypeOrmModule.forRootAsync(UserOrmConfig), IdentityModule, UserModule],
	exports: [UserModule],
})
export class UsersModule {}
