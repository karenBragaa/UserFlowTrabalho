using models;

public class UserService{
  private readonly UsuarioRepositorie _UsuarioRepositorie;

  public UserService (UsuarioRepositorie usuarioRepositorie){
    _UsuarioRepositorie = usuarioRepositorie;
  } 

    public async Task<Usuario> Cadastrar(Usuario usuario){
        await _UsuarioRepositorie.Cadastrar(usuario);
        return usuario;
    }

    public async Task<List<Usuario>> VisualizarUsuarios(){

        return await _UsuarioRepositorie.VisualizarUsuarios();
    }

    public async Task<Usuario> VisualizarUsuarioId (int Id){
       return await _UsuarioRepositorie.VisualizarUsuarioId(Id);
         
    }
    public async Task<Usuario> AtualizarUsuarios (Usuario usuario, int Id ){
      return await _UsuarioRepositorie.AtualizarUsuarios(usuario, Id);

    }
    public async Task<bool> Deletarsuarios (int Id){
      return await _UsuarioRepositorie.Deletarsuarios(Id);
       
    } 
}
