using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class SeedValues : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "MyProperty",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, 101 });

            migrationBuilder.InsertData(
                table: "MyProperty",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, 102 });

            migrationBuilder.InsertData(
                table: "MyProperty",
                columns: new[] { "Id", "Name" },
                values: new object[] { 3, 103 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MyProperty",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "MyProperty",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "MyProperty",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
