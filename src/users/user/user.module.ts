import { Module } from "@nestjs/common";
import { IdentityModule } from "../identity/identity.module.js";
import { UserController } from "./controller/user.controller.js";
import { UserService } from "./service/user.service.js";

@Module({
	imports: [IdentityModule],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
