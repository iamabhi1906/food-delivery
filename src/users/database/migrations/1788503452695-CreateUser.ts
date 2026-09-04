import { MigrationInterface, QueryRunner, Table, TableUnique } from "typeorm";

export class CreateUser1788503452695 implements MigrationInterface {
	name = "CreateUser1788503452695";
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				schema: "users",
				name: "users",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
						isNullable: false,
						default: "uuid_generate_v4()",
					},
					{
						name: "email",
						type: "varchar",
						isNullable: false,
					},
					{
						name: "name",
						type: "varchar",
						isNullable: false,
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
				uniques: [
					new TableUnique({
						name: "UQ_users_email",
						columnNames: ["email"],
					}),
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "users"."users"`);
	}
}
