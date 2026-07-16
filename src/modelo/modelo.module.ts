import { Module } from '@nestjs/common';
import { ModeloService } from './modelo.service';
import { ModeloController } from './modelo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeloModel } from './modelo.model';
import { MarcaModule } from 'src/marca/marca.module';

@Module({
  imports: [TypeOrmModule.forFeature([ModeloModel]), MarcaModule],
  providers: [ModeloService],
  controllers: [ModeloController],
  exports: [ModeloService]
})
export class ModeloModule {}
