export class NotificationResponseDto {
	id: string;
	userId: string;
	message: string;
	channel: string;
	isRead: boolean;
	createdAt: Date;
	updatedAt: Date;
}
