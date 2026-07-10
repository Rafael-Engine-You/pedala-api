import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EstacoesService } from './estacoes.service';
import { EstacaoRequestDto } from './dto/estacao_request.dto';
import { EstacaoModel } from './estacao.model';

@Controller('estacoes')
export class EstacoesController {

    constructor(
        private readonly estacaoService: EstacoesService
    ){}


    @Post() //http://localhost:3000/estacoes
    async addEstacao(@Body() request: EstacaoRequestDto):Promise<void> {
        await this.estacaoService.criarEstacao(request)
    }

    @Get()
    async carregarEstacoes():Promise<EstacaoModel[]>  {
        return await this.estacaoService.buscarTodasEstacoes()
    }

    @Get("/:id")
    async buscarEstacaoPorId(@Param("id") estacaoId: string):Promise<EstacaoModel | null> {
        return this.estacaoService.buscarEstacaoPorId(estacaoId)
    }
}
