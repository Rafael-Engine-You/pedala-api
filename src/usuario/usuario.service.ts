import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRequestDto } from './dto/usuario_request.dto';
import { Repository } from 'typeorm';
import {UsuarioModel} from './usuario.model'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioModel)
        private readonly usuarioRepository:Repository<UsuarioModel>
    ){}

    async salvarUsuario(dto: UsuarioRequestDto): Promise<void> {
        const existeUsuario = await this.usuarioRepository.findOne({
            where: {
                email: dto.email
            }
        })

        if (existeUsuario) throw new BadRequestException(`Usuário ja 
            cadastrado com este email`)

        await this.usuarioRepository.save(dto)
    }

    async listarUsuario(): Promise<UsuarioModel[]> {
        return await this.usuarioRepository.find()
    }

    buscarUsuarioPeloEmail(email:string) {
      
    }
}
