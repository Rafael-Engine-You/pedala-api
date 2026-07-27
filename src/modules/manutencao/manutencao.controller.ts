import { Controller, Post } from '@nestjs/common';
import { ManutencaoService } from './manutencao.service';
import { ManutencaoRequestDto } from './dto/manutencao_request.dto';

@Controller('manutencao')
export class ManutencaoController {

    constructor(
        private readonly manutencaoService: ManutencaoService
    ){}

    @Post()
    async registrarManutencao(request: ManutencaoRequestDto):Promise<void> {}
}
