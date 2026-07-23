import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRequestDto } from './dto/usuario_request.dto';
import { Repository } from 'typeorm';
import {UsuarioModel} from './usuario.model'
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEditarRequestDto } from './dto/usuario_editar_request.dto';
import { UsuarioPapel } from './papel.enun';
import bcrypt from 'bcrypt'

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

        const passwdHash = await bcrypt.hash(dto.senha, 12)

        const usuario = this.usuarioRepository.create({
            email: dto.email,
            senha: passwdHash,
            nome: dto.nome,
            perfil: dto.perfil ? dto.perfil : UsuarioPapel.CLIENTE
        })    
        await this.usuarioRepository.save(usuario)
    }

    async listarUsuario(): Promise<UsuarioModel[]> {
        return await this.usuarioRepository.find()
    }

    async buscarUsuarioPeloEmail(email:string): Promise<UsuarioModel | null> {
      return await this.usuarioRepository.findOne({
            where: {
                email: email
            }
        })
    }

    // async buscarUsuarioPeloId(id:string): 
    // Promise<UsuarioModel> {
    //   const usuario = await this.usuarioRepository.findOneBy({
    //     id: id
    //   })

    //   if(!usuario) throw new BadRequestException("Usuario não encontrado!")
    //   return usuario  
    // }
    async buscarUsuarioPeloId(id:string): 
    Promise<UsuarioModel> {
      return await this.usuarioRepository.findOneByOrFail({
        id
      })  
    }

    async editar(id:string, dto: UsuarioEditarRequestDto):Promise<void>{
        console.log('**** ', dto)
        const result = await this.usuarioRepository.update(id, dto)
    }
}
