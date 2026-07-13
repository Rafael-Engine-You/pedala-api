import { BadRequestException, Injectable } from '@nestjs/common';
import { EstacaoModel } from './estacao.model';
import { ILike, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EstacaoRequestDto } from './dto/estacao_request.dto';

@Injectable()
export class EstacoesService {

    constructor(
        @InjectRepository(EstacaoModel)
        private readonly estacaoRepository: Repository<EstacaoModel>
    ){}

    async criarEstacao(request: EstacaoRequestDto):Promise<void> {
        const estacao = await this.buscarEstacaoPeloNome(request.nome)
        if(estacao) throw new BadRequestException(`Já existe uma estação 
            cadastrada com ${request.nome}`)
        await this.estacaoRepository.save(request)
    }

    async buscarEstacaoPeloNome(nomeEstacao: string):Promise<EstacaoModel | null> {
        return await this.estacaoRepository.findOne({
            where: {
                nome: nomeEstacao
            }
        })
    }

    async buscarTodasEstacoes():Promise<EstacaoModel[]> {
        return await this.estacaoRepository.find()
    }

    async buscarEstacaoPorId(id:string): Promise<EstacaoModel | null> {
        console.log('*** ', id)
        return await this.estacaoRepository.findOneBy({
            id
        })
    }

    async buscarEstacaoUsandoParteDoNome(query: string): 
    Promise<EstacaoModel[]> {
        console.log('*** ', query)
        const estacoes = await this.estacaoRepository.find({
            where: {
                nome: ILike(`%${query}%`) 
            }
        })
        return estacoes
    }
}