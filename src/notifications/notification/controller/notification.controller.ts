import { Controller, Get, Post, Patch, Body, Param, Query, ParseUUIDPipe, HttpCode, HttpStatus } from "@nestjs/common";
import { NotificationService } from "../service/notification.service.js";
import { CreateNotificationDto } from "../dto/create-notification.dto.js";
import { NotificationResponseDto } from "../dto/notification-response.dto.js";

@Controller("notifications")
export class NotificationController {
	constructor(private readonly notificationService: NotificationService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() createNotificationDto: CreateNotificationDto): Promise<NotificationResponseDto> {
		return this.notificationService.create(createNotificationDto);
	}

	@Get()
	async findAll(@Query("userId") userId?: string): Promise<NotificationResponseDto[]> {
		if (userId) {
			return this.notificationService.findByUserId(userId);
		}
		return this.notificationService.findAll();
	}

	@Get(":id")
	async findOne(@Param("id", ParseUUIDPipe) id: string): Promise<NotificationResponseDto> {
		return this.notificationService.findById(id);
	}

	@Patch(":id/read")
	async markAsRead(@Param("id", ParseUUIDPipe) id: string): Promise<NotificationResponseDto> {
		return this.notificationService.markAsRead(id);
	}
}
