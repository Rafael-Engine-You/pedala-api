import { Module } from '@nestjs/common';
import { ManutencaoService } from './manutencao.service';
import { ManutencaoController } from './manutencao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManutencaoModel } from './manutencao.model';
import { BicicletasModule } from '../bicicletas/bicicletas.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([ManutencaoModel]),
    BicicletasModule,
    UsuarioModule
  ],
  providers: [ManutencaoService],
  controllers: [ManutencaoController]
})
export class ManutencaoModule {}
