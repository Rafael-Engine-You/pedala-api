import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRequestDto } from './dto/usuario_request.dto';
import { Repository } from 'typeorm';
import {UsuarioModel} from './usuario.model'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioModel)
        private readonly usuarioRepository: 
        Repository<UsuarioModel>
    ){}

    salvarUsuario(dto: UsuarioRequestDto) {
        this.usuarioRepository.save(dto)
    }

    listarUsuario() {
    
    }

    buscarUsuarioPeloEmail(email:string) {
      
    }
}
