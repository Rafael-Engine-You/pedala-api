import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BicicletaModel } from './bicicleta.model';
import { InjectRepository } from '@nestjs/typeorm';
import { EstacoesService } from 'src/modules/estacoes/estacoes.service';
import { BicicletaRequestDto } from './dto/bicicleta_request.dto';
import { BicicletaResponseDto } from './dto/bicicleta_response.dto';
import { ModeloService } from '../modelo/modelo.service';

@Injectable()
export class BicicletasService {

    constructor(
        @InjectRepository(BicicletaModel)
        private readonly bicicletaRepository: Repository<BicicletaModel>,
        private readonly modeloService: ModeloService,
        private readonly estacoesService: EstacoesService
    ){}

    // TODO: Editar cadastro de bicicletas
    // TODO: Melhorar a apresentação do JSON de bicicletas
    // TODO: Refatorar o total de bicicletas por estação

    async addBicicleta(data: BicicletaRequestDto): Promise<void> {
        const lotacao = await this.estacoesService
                    .buscarEstacaoPorIdESituacao(data.estacaoId, true)
        const modelo = await this.modeloService
                .carregarModeloPeloId(data.modeloId)

        // total de bicicletas na estacao
        const contarTotalDeBicicletaNaEstacao: number = 
           await this.contarTotalBicicletasPorEstacao(lotacao.id) 

        if(contarTotalDeBicicletaNaEstacao >= lotacao.capacidade) {
            throw new 
                BadRequestException(`Estação com capacidade máxima atingida`)
        }

        const bicicleta = this.bicicletaRepository.create({
            status: data.status,
            modelo: modelo,
            lotacao: lotacao,
            dataCadastro: new Date()
        })    
        await this.bicicletaRepository.save(bicicleta)
    }

    async contarTotalBicicletasPorEstacao(estacaoId: string):Promise<number> {
        return await this.bicicletaRepository.count({
            where: {
                lotacao: {
                    id: estacaoId
                }
            }
        })
    }

    async carregarBicicletas():Promise<BicicletaResponseDto[]>{
        const bicicletas = await this.bicicletaRepository.find({
            relations: {
                modelo: {
                    marca: true
                },
                lotacao: true
            }
        })

        return bicicletas.map(b => this.converterModelEmResponse(b))
    }


    async carregarBicicletaPeloId(bicicletaId: string):
        Promise<BicicletaModel> {
        const bicicleta = await this.bicicletaRepository
                .findOneBy({ id: bicicletaId})
        if(!bicicleta) 
            throw new BadRequestException("Bicicleta não encontrada")
        return bicicleta    
    } 

    converterModelEmResponse(bicicleta: BicicletaModel): BicicletaResponseDto {
        return ({
            id: bicicleta.id,
            estacaoAtual: bicicleta.lotacao.nome,
            modelo: bicicleta.modelo.nomeModelo,
            marca: bicicleta.modelo.marca.nomeMarca,
            status: bicicleta.status
        })
    }


}
