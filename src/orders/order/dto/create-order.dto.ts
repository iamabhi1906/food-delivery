import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from "class-validator";

export class CreateOrderDto {
	@IsUUID()
	@IsNotEmpty()
	userId: string;

	@IsNumber()
	@IsPositive()
	totalAmount: number;
}
