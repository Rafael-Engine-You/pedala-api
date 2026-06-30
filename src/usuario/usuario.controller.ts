import { Controller, Get } from '@nestjs/common';

@Controller('usuarios')
export class UsuarioController {

  @Get()
  carregarUsuario() {
    return {
      nome: "Carlos Antônio",
      email: "carlos_ant@mail.com",
      telefone: "(86) 9.9855-9966"
    }
  }
}
