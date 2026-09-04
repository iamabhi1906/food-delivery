import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrders1788507494805 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				schema: "orders",
				name: "orders",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
						isNullable: false,
						default: "gen_random_uuid()",
					},
					{
						name: "user_id",
						type: "uuid",
						isNullable: false,
					},
					{
						name: "total_amount",
						type: "decimal",
						precision: 10,
						scale: 2,
						isNullable: false,
					},
					{
						name: "status",
						type: "varchar",
						isNullable: false,
						default: "'PENDING'",
					},
					{
						name: "created_at",
						type: "timestamptz",
						isNullable: false,
						default: "now()",
					},
					{
						name: "updated_at",
						type: "timestamptz",
						isNullable: false,
						default: "now()",
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(
			new Table({
				schema: "orders",
				name: "orders",
			}),
		);
	}
}
