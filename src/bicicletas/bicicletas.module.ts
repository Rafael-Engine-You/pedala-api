import { Module } from '@nestjs/common';
import { BicicletasService } from './bicicletas.service';
import { BicicletasController } from './bicicletas.controller';

@Module({
  providers: [BicicletasService],
  controllers: [BicicletasController]
})
export class BicicletasModule {}
