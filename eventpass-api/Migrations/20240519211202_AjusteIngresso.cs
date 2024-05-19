using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eventpass_api.Migrations
{
    /// <inheritdoc />
    public partial class AjusteIngresso : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantidade",
                table: "Ingressos");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Ingressos");

            migrationBuilder.RenameColumn(
                name: "flyer",
                table: "Eventos",
                newName: "Flyer");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Flyer",
                table: "Eventos",
                newName: "flyer");

            migrationBuilder.AddColumn<int>(
                name: "Quantidade",
                table: "Ingressos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Ingressos",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
