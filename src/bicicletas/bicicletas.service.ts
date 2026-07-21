import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BicicletaModel } from './bicicleta.model';
import { InjectRepository } from '@nestjs/typeorm';
import { ModeloService } from 'src/modelo/modelo.service';
import { EstacoesService } from 'src/estacoes/estacoes.service';
import { BicicletaRequestDto } from './dto/bicicleta_request.dto';

@Injectable()
export class BicicletasService {

    constructor(
        @InjectRepository(BicicletaModel)
        private readonly bicicletaRepository: Repository<BicicletaModel>,
        private readonly modeloService: ModeloService,
        private readonly estacoesService: EstacoesService
    ){}

    async addBicicleta(data: BicicletaRequestDto): Promise<void> {
        const lotacao = await this.estacoesService
                    .buscarEstacaoPorIdESituacao(data.estacaoId, true)
        const modelo = await this.modeloService.carregarModeloPeloId(data.modeloId)

        // total de bicicletas na estacao
        const contarTotalDeBicicletaNaEstacao = await this.bicicletaRepository.count({
            where: {
                lotacao: {
                    id: lotacao.id
                }
            }
        })

        if(lotacao.capacidade > contarTotalDeBicicletaNaEstacao && lotacao.ativa === true ) {
            throw new 
                BadRequestException(`Estação com capacidade máxima de ${lotacao.capacidade}`)
        }

        const bicicleta = this.bicicletaRepository.create({
            status: data.status,
            modelo: modelo,
            lotacao: lotacao,
            dataCadastro: new Date()
        })    
        await this.bicicletaRepository.save(bicicleta)
    }

    async carregarBicicletas():Promise<BicicletaModel[]>{
        return await this.bicicletaRepository.find({
            relations: {
                modelo: {
                    marca: true
                },
                lotacao: true
            }
        })
    }
}
