import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "notifications", schema: "notifications" })
export class NotificationEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ name: "user_id", type: "uuid" })
	userId: string;

	@Column({ type: "varchar" })
	message: string;

	@Column({ type: "varchar", default: "EMAIL" })
	channel: string;

	@Column({ name: "is_read", type: "boolean", default: false })
	isRead: boolean;

	@CreateDateColumn({ name: "created_at", type: "timestamptz" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
	updatedAt: Date;
}
