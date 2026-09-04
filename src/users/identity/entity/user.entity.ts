import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "users", schema: "users" })
export class UserEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar", unique: true })
	email: string;

	@Column({ type: "varchar" })
	name: string;

	@CreateDateColumn({ name: "created_at", type: "timestamptz" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
	updatedAt: Date;
}
