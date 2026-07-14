import { Controller, Get, Post, Query } from '@nestjs/common';
import { ModeloService } from './modelo.service';
import { ModeloModel } from './modelo.model';

@Controller('modelo')
export class ModeloController {

    constructor(
        private readonly modeloService: ModeloService
    ){}

    @Post()
    async addModelo():Promise<void> {
        
    }

    @Get()
    async carregarModelos():Promise<ModeloModel[] | null>{
        return null
    }

    @Get("/marcas")
    async carregarModelosPelaMarca(@Query("marca") marca: string):Promise<void> {}

}
