import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRequestDto } from './dto/usuario_request.dto';

@Injectable()
export class UsuarioService {
    private usuarios:any = [
        {
            nome: "José Antônio",
            email: "jose@mail.com",
            telefone: "(86) 9.9988-6633"
        },
        {
            nome: "Maira José",
            email: "mjose@mail.com",
            telefone: "(86) 9.9987-5544"
        }
    ]

    salvarUsuario(dto: UsuarioRequestDto) {
        this.usuarios.push(dto)
    }

    listarUsuario() {
        return this.usuarios 
    }

    buscarUsuarioPeloEmail(email:string) {
        const usuario = this.usuarios
        .find(u => u.email === email)  

        if (usuario === null || usuario === undefined) {
            throw new 
            NotFoundException("Usuário não encontrado!")
        }
        return usuario  
    }
}
