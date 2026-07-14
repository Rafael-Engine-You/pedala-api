import { Module } from '@nestjs/common';
import { ModeloService } from './modelo.service';
import { ModeloController } from './modelo.controller';

@Module({
  providers: [ModeloService],
  controllers: [ModeloController]
})
export class ModeloModule {}
