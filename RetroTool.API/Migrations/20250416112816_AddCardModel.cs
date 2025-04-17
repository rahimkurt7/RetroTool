using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RetroTool.API.Migrations
{
    /// <inheritdoc />
    public partial class AddCardModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cards_Categories_CategoryId",
                table: "Cards");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Cards_CategoryId",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Cards");

            migrationBuilder.RenameColumn(
                name: "Color",
                table: "Cards",
                newName: "Username");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Cards",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Cards",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Cards");

            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Cards",
                newName: "Color");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Cards",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cards_CategoryId",
                table: "Cards",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cards_Categories_CategoryId",
                table: "Cards",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
