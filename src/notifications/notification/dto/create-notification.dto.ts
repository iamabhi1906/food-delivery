import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateNotificationDto {
	@IsUUID()
	@IsNotEmpty()
	userId: string;

	@IsString()
	@IsNotEmpty()
	message: string;

	@IsString()
	@IsOptional()
	channel?: string;
}
