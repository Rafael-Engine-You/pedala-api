import { BadRequestException, Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { ModeloModel } from './modelo.model';
import { InjectRepository } from '@nestjs/typeorm';
import { ModeloRequestDto } from './dto/modelo_request.dto';
import { MarcaService } from 'src/marca/marca.service';
import { MarcaModule } from 'src/marca/marca.module';
import { ModeloResponseDto } from './dto/modelo_response.dto';

@Injectable()
export class ModeloService {

    constructor(
        @InjectRepository(ModeloModel)
        private readonly moduloRepository: Repository<ModeloModel>,
        private readonly marcaService: MarcaService
    ){}

    async addModelo(request: ModeloRequestDto):Promise<void> {
        const marca = await this.marcaService.carregarMarcaPorId(request.marcaId)
        const existeModelo = await this.moduloRepository.findOneBy({
            nomeModelo: request.nome
        }) 

        if(existeModelo) throw new BadRequestException("Modelo já registrado")
        const modelo = this.moduloRepository.create({ 
            nomeModelo: request.nome,
            marca
        })

        await this.moduloRepository.save(modelo)
    }

    async carregaModelos():Promise<ModeloResponseDto[]> {
        const modelos = await this.moduloRepository.find({
            relations:{
                marca: true
            }
        })

        return modelos.map(mo => ({
            id: mo.id,
            modelo: mo.nomeModelo,
            marca: mo.marca.nomeMarca 
        }))
    }

    async carregarModeloPelaMarca(marca:string):Promise<ModeloResponseDto[]>{
     const modelos = await this.moduloRepository.find({
        where: {
            marca: {
                nomeMarca: ILike(`%${marca}%`)
            }
        },
        relations: {
            marca: true
        }
     })   

     return modelos.map(modelo => {
        return {}
     })
    }
}
