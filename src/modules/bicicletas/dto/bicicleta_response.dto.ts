import { IsEnum } from "class-validator"
import { StatusEstacao } from "../status_estacao.enum"

export class BicicletaResponseDto {
    id:string
    modelo:string
    marca:string

    @IsEnum(StatusEstacao)
    status:StatusEstacao
    
    estacaoAtual:string
}