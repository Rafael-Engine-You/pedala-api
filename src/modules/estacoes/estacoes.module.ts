import { Module } from '@nestjs/common';
import { EstacoesController } from './estacoes.controller';
import { EstacoesService } from './estacoes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstacaoModel } from './estacao.model';

@Module({
  imports: [TypeOrmModule.forFeature([EstacaoModel])],
  controllers: [EstacoesController],
  providers: [EstacoesService],
  exports: [EstacoesService]
})
export class EstacoesModule {}
