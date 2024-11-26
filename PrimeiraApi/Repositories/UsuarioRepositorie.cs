//unica que tem responsabilidade de acessar o banco, toda classe reporitorie acessa o banco, pode ter o nome de infraestrutura

using Microsoft.EntityFrameworkCore;
using models;

public class UsuarioRepositorie{

    private readonly AppDbContext _context;
   
    public UsuarioRepositorie(AppDbContext appDbContext ){
        _context = appDbContext;
    }

    // função assincrona, cadastrar usuario 
    public async Task<Usuario> Cadastrar(Usuario usuario){
        //espere fazer isso
        await _context.Usuarios.AddAsync(usuario);
        await _context.SaveChangesAsync();
        return usuario;
    }

    public async Task<List<Usuario>> VisualizarUsuarios(){

        return await _context.Usuarios.ToListAsync();
    }

    public async Task<Usuario> VisualizarUsuarioId (int Id){
        Usuario user = await _context.Usuarios.FirstOrDefaultAsync(x => x.Id == Id);
        return user;  
    }
    public async Task<Usuario> AtualizarUsuarios (Usuario usuario, int Id ){
      Usuario user = await VisualizarUsuarioId(Id);

      if (user == null){
        throw new Exception($"Usuario para o ID: {Id} não foi encontrado! " );
      }
      user.Nome = usuario.Nome;
      user.Senha = usuario.Senha;

      _context.Usuarios.Update(user);
      await _context.SaveChangesAsync();

      return user;
    }
    public async Task<bool> Deletarsuarios (int Id){
      Usuario user = await VisualizarUsuarioId(Id);
      if (user == null){
        throw new Exception($"Usuario para o ID: {Id} não foi encontrado! " );
      }

      _context.Usuarios.Remove(user);
       await _context.SaveChangesAsync();
       
       return true;
    } 
}

