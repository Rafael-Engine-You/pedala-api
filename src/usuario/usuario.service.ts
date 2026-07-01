import { Injectable } from '@nestjs/common';

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

    listarUsuario() {
        return this.usuarios 
    }

    buscarUsuarioPeloEmail(email:string) {
        const usuario = this.usuarios
        .find(u => u.email === email)  
        return usuario  
    }
}
