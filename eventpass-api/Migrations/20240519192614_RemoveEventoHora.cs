using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eventpass_api.Migrations
{
    /// <inheritdoc />
    public partial class RemoveEventoHora : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Data",
                table: "Eventos");

            migrationBuilder.RenameColumn(
                name: "Hora",
                table: "Eventos",
                newName: "DataHora");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DataHora",
                table: "Eventos",
                newName: "Hora");

            migrationBuilder.AddColumn<DateTime>(
                name: "Data",
                table: "Eventos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
