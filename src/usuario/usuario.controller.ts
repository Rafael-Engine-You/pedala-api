import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioRequestDto } from './dto/usuario_request.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // http://localhost:3001/usuarios
  @Get()
  todosUsuarios() {
    return this.usuarioService.listarUsuario();
  }

  // http://localhost:3001/usuarios/buscar/mjose@mail.com
  @Get('/buscar/:email')
  buscarPeloEmail(@Param('email') email: string) {
    return this.usuarioService.buscarUsuarioPeloEmail(email);
  }

  // http://localhost:3001/usuarios?email=mjose@mail.com
  @Get('/buscar')
  buscarUsuarioPeloEmail(@Query('email') email: string) {
    return this.usuarioService.buscarUsuarioPeloEmail(email);
  }

  @Post()
  addUsuario(@Body() request: UsuarioRequestDto) {
    this.usuarioService.salvarUsuario(request);
  }
}
