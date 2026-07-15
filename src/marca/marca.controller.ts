import { Body, Controller, Get, Post } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { MarcaModel } from './marca.model';

@Controller('marcas')
export class MarcaController {

    constructor(
        private readonly marcaService: MarcaService
    ){}

    @Post()
    async novaMarca(@Body() data: {nome: string}):Promise<void> {
        await this.marcaService.addMarca(data)
    }

    @Get()
    async todasMarcas(): Promise<MarcaModel[]> {
        return this.marcaService.carregarMarcas()
    }
}
