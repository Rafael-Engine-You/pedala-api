import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService:UsuarioService){}

  @Get()
  todosUsuarios(){
    return this.usuarioService.listarUsuario()
  }
  
  // http://localhost:3001/usuarios/buscar/mjose@mail.com
  @Get("/buscar/:email")
  buscarPeloEmail(@Param("email") email:string){
    return this.usuarioService.buscarUsuarioPeloEmail(email)
  }

  @Get("/buscar")
  buscarUsuarioPeloEmail(@Query("email") email:string){
    return this.usuarioService.buscarUsuarioPeloEmail(email)
  }
}
