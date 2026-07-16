import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BicicletaModel } from './bicicleta.model';
import { InjectRepository } from '@nestjs/typeorm';
import { ModeloService } from 'src/modelo/modelo.service';

@Injectable()
export class BicicletasService {

    constructor(
        @InjectRepository(BicicletaModel)
        private readonly bicicletaRepository: Repository<BicicletaModel>,
        private readonly modeloService: ModeloService
    ){}

    async addBicicleta(): Promise<void> {
        
    }

    async carregarBicicletas():Promise<void>{}
}
