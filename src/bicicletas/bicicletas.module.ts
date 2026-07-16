import { Module } from '@nestjs/common';
import { BicicletasService } from './bicicletas.service';
import { BicicletasController } from './bicicletas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BicicletaModel } from './bicicleta.model';
import { ModeloModule } from 'src/modelo/modelo.module';

@Module({
  imports: [TypeOrmModule.forFeature([BicicletaModel]), ModeloModule],
  providers: [BicicletasService],
  controllers: [BicicletasController]
})
export class BicicletasModule {}
