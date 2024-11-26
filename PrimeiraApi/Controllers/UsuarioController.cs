using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using models;

[ApiController]
[Route("Api/[controller]")]
public class UsuarioController : ControllerBase {

private readonly UserService _userService;

public UsuarioController (UserService userService){
    _userService = userService;
}

[HttpPost("Create")]
public async Task<ActionResult> RotaCadastro (Usuario usuario){
    try {
        var user = _userService.Cadastrar(usuario);
        return Ok(user);
    }
    catch (Exception ex){
        return BadRequest(ex.Message);
    }
}

[HttpGet("GetAll")]
public async Task<ActionResult> Visualizarcadastros ( ){
    try {
        var user = _userService.VisualizarUsuarios();
        return Ok(user);
    }
    catch (Exception ex){
        return BadRequest(ex.Message);
    }
}

[HttpGet("GetById/{Id}")]
public async Task<ActionResult> VisualizarcadastroId (int Id){
    try {
        var user = _userService.VisualizarUsuarioId(Id);
        return Ok(user);
    }
    catch (Exception ex){
        return BadRequest(ex.Message);
    }
}

[HttpPut("Update/{Id}")]
public async Task<ActionResult> AtualizarUsuario (Usuario usuario, int Id){
    try {
        var user = _userService.AtualizarUsuarios(usuario, Id);
        return Ok(user);
    }
    catch (Exception ex){
        return BadRequest(ex.Message);
    }
}

[HttpDelete("Delete/{Id}")]
public async Task<ActionResult> ApagarUsuario (int Id){
    try {
        var user = _userService.Deletarsuarios(Id);
        return Ok(user);
    }
    catch (Exception ex){
        return BadRequest(ex.Message);
    }
}
}