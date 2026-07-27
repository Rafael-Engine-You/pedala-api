import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ManutencaoModel } from './manutencao.model';
import { InjectRepository } from '@nestjs/typeorm';
import { BicicletasService } from '../bicicletas/bicicletas.service';
import { UsuarioService } from '../usuario/usuario.service';
import { ManutencaoRequestDto } from './dto/manutencao_request.dto';

@Injectable()
export class ManutencaoService {
    constructor(
        @InjectRepository(ManutencaoModel)
        private readonly manutencaoRepository: Repository<ManutencaoModel>,
        private readonly bicicletaService: BicicletasService,
        private readonly usuarioService: UsuarioService
    ){}

    async addManutencao(request: ManutencaoRequestDto):Promise<void> {
        const bicicleta = await this.bicicletaService
                .carregarBicicletaPeloId(request.bicicletaId)
        const responsavel = await this.usuarioService
                    .buscarUsuarioPeloId(request.responsavelId)
        
        //TODO: mudar status da bicicleta
        //TODO: decrementar na estacao
                    
        const manutencao = this.manutencaoRepository.create({
            bicicleta,
            responsavel,
            descricao: request.descricao
        })

        await this.manutencaoRepository.save(manutencao)
    }
   
    async atualizarManutencao(idManutencao, data: {}):Promise<void> {}

    async listarManutencoes():Promise<void> {}

    async buscarManutencaoPeloBicicleta(bicicletaId: string):Promise<void> {}
    
    async buscarManutencaoPorId(idManutencao:string):Promise<void> {}
    
    async solicitacaoPeloUsuarioAdmin(usuarioId: string):Promise<void> {}

}
