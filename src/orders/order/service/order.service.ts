import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderEntity } from "../entity/order.entity.js";
import { CreateOrderDto } from "../dto/create-order.dto.js";
import { OrderResponseDto } from "../dto/order-response.dto.js";

@Injectable()
export class OrderService {
	constructor(
		@InjectRepository(OrderEntity, "orders")
		private readonly orderRepository: Repository<OrderEntity>,
	) {}

	async create(dto: CreateOrderDto): Promise<OrderResponseDto> {
		const order = this.orderRepository.create({
			userId: dto.userId,
			totalAmount: dto.totalAmount,
			status: "CONFIRMED",
		});
		const saved = await this.orderRepository.save(order);
		return this.mapToResponse(saved);
	}

	async findAll(): Promise<OrderResponseDto[]> {
		const orders = await this.orderRepository.find();
		return orders.map((o) => this.mapToResponse(o));
	}

	async findById(id: string): Promise<OrderResponseDto> {
		const order = await this.orderRepository.findOne({ where: { id } });
		if (!order) {
			throw new NotFoundException(`Order with ID ${id} not found`);
		}
		return this.mapToResponse(order);
	}

	private mapToResponse(entity: OrderEntity): OrderResponseDto {
		return {
			id: entity.id,
			userId: entity.userId,
			totalAmount: Number(entity.totalAmount),
			status: entity.status,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}
}
