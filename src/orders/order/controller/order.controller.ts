import { Controller, Get, Post, Body, Param, ParseUUIDPipe, HttpCode, HttpStatus } from "@nestjs/common";
import { OrderService } from "../service/order.service.js";
import { CreateOrderDto } from "../dto/create-order.dto.js";
import { OrderResponseDto } from "../dto/order-response.dto.js";

@Controller("orders")
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
		return this.orderService.create(createOrderDto);
	}

	@Get()
	async findAll(): Promise<OrderResponseDto[]> {
		return this.orderService.findAll();
	}

	@Get(":id")
	async findOne(@Param("id", ParseUUIDPipe) id: string): Promise<OrderResponseDto> {
		return this.orderService.findById(id);
	}
}
