import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNotification1788503987716 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				schema: "notifications",
				name: "notifications",
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
						name: "message",
						type: "varchar",
						isNullable: false,
					},
					{
						name: "channel",
						type: "varchar",
						isNullable: false,
						default: "'EMAIL'",
					},
					{
						name: "is_read",
						type: "boolean",
						isNullable: false,
						default: false,
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
				schema: "notifications",
				name: "notifications",
			}),
		);
	}
}
