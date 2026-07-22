import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
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

    @Put("/atualizar/:id")
    @HttpCode(204)
    async atualizarDadosDaMarca(@Param("id") marcaId: string, 
            @Body() data: {nome: string}): Promise<void>{
        await this.marcaService.atualizarMarca(marcaId, data)        
    }

    @Delete("/remover/:id")
    async deletarMarca(@Param("id") id:string):Promise<void> {
        await this.marcaService.removerMarca(id)
    }
}
