using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Docsfer.EntityFrameworkCore.Migrations
{
    /// <inheritdoc />
    public partial class Added_PartyTypeAndCurrentVersion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PartyOneType",
                table: "Relationship",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PartyTwoType",
                table: "Relationship",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CurrentVersion",
                table: "BlobEntry",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PartyOneType",
                table: "Relationship");

            migrationBuilder.DropColumn(
                name: "PartyTwoType",
                table: "Relationship");

            migrationBuilder.DropColumn(
                name: "CurrentVersion",
                table: "BlobEntry");
        }
    }
}
