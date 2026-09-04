import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "orders", schema: "orders" })
export class OrderEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ name: "user_id", type: "uuid" })
	userId: string;

	@Column({
		name: "total_amount",
		type: "decimal",
		precision: 10,
		scale: 2,
		transformer: {
			to: (value: number) => value,
			from: (value: string) => parseFloat(value),
		},
	})
	totalAmount: number;

	@Column({ type: "varchar", default: "PENDING" })
	status: string;

	@CreateDateColumn({ name: "created_at", type: "timestamptz" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
	updatedAt: Date;
}
