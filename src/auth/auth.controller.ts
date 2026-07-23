import { Controller, Post } from '@nestjs/common';
import { UsuarioRequestDto } from 'src/usuario/dto/usuario_request.dto';

@Controller('auth')
export class AuthController {

    @Post("/cliente/cadastrar")
    async autoCadastroCliente(dto: UsuarioRequestDto):Promise<void> {}

    @Post()
    async logar():Promise<string> {
        return "abcdef102030"
    }
}
