import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModel } from './usuario.model';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioModel])],
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule {}
