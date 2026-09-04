import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotificationEntity } from "../entity/notification.entity.js";
import { CreateNotificationDto } from "../dto/create-notification.dto.js";
import { NotificationResponseDto } from "../dto/notification-response.dto.js";

@Injectable()
export class NotificationService {
	constructor(
		@InjectRepository(NotificationEntity, "notifications")
		private readonly notificationRepository: Repository<NotificationEntity>,
	) {}

	async create(dto: CreateNotificationDto): Promise<NotificationResponseDto> {
		const notification = this.notificationRepository.create({
			userId: dto.userId,
			message: dto.message,
			channel: dto.channel || "EMAIL",
			isRead: false,
		});

		const saved = await this.notificationRepository.save(notification);
		return this.mapToResponse(saved);
	}

	async findAll(): Promise<NotificationResponseDto[]> {
		const notifications = await this.notificationRepository.find();
		return notifications.map((n) => this.mapToResponse(n));
	}

	async findByUserId(userId: string): Promise<NotificationResponseDto[]> {
		const notifications = await this.notificationRepository.find({
			where: { userId },
		});
		return notifications.map((n) => this.mapToResponse(n));
	}

	async findById(id: string): Promise<NotificationResponseDto> {
		const notification = await this.notificationRepository.findOne({
			where: { id },
		});
		if (!notification) {
			throw new NotFoundException(`Notification with ID ${id} not found`);
		}
		return this.mapToResponse(notification);
	}

	async markAsRead(id: string): Promise<NotificationResponseDto> {
		const notification = await this.notificationRepository.findOne({
			where: { id },
		});
		if (!notification) {
			throw new NotFoundException(`Notification with ID ${id} not found`);
		}
		notification.isRead = true;
		const saved = await this.notificationRepository.save(notification);
		return this.mapToResponse(saved);
	}

	private mapToResponse(entity: NotificationEntity): NotificationResponseDto {
		return {
			id: entity.id,
			userId: entity.userId,
			message: entity.message,
			channel: entity.channel,
			isRead: entity.isRead,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}
}
