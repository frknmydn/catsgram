import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class IsBannedMigration1693259538157 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "isBanned",
                type:"boolean",
                default: false,
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "isBanned");
    }

}
