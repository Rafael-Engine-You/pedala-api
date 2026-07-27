import { Module } from '@nestjs/common';
import { BicicletasService } from './bicicletas.service';
import { BicicletasController } from './bicicletas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BicicletaModel } from './bicicleta.model';
import { ModeloModule } from '../modelo/modelo.module';
import { EstacoesModule } from '../estacoes/estacoes.module';

@Module({
  imports: [TypeOrmModule.forFeature([BicicletaModel]), ModeloModule, 
  EstacoesModule],
  providers: [BicicletasService],
  controllers: [BicicletasController],
  exports: [BicicletasService]
})
export class BicicletasModule {}
