using Microsoft.EntityFrameworkCore;


//configurar banco
public class AppDbContext : DbContext{
    public AppDbContext (DbContextOptions<AppDbContext>options): base(options) {}
//configurar tabela
    public DbSet<models.Usuario> Usuarios{get;set;}
}
