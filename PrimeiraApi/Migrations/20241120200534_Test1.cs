using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PrimeiraApi.Migrations
{
    /// <inheritdoc />
    public partial class Test1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "NUMBER(10)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Nome = table.Column<string>(type: "NVARCHAR2(100)", nullable: false),
                    Email = table.Column<string>(type: "NVARCHAR2(50)", nullable: false),
                    Senha = table.Column<string>(type: "NVARCHAR2(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);

                });
                migrationBuilder.Sql("CREATE SEQUENCE SEQ_USUARIOS START WITH 1 INCREMENT BY 1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP SEQUENCE SEQ_USUARIOS");
            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
