import { IsEnum, IsNotEmpty } from "class-validator"
import { StatusEstacao } from "../status_estacao.enum"

export class BicicletaRequestDto {
    
    @IsNotEmpty({message: "Campo modelo é obrigatório"})
    modeloId: string

    @IsNotEmpty({message: "Campo lotacão é obrigatório"})
    estacaoId: string

    @IsNotEmpty({message: "Campo modelo é obrigatório"})
    @IsEnum(StatusEstacao, 
        {
            message: `Status inválido. 
            Valores permitidos: EM_USO, DIPONIVEL,EM_MANUTENCAO ou INATIVA`
        })
    status: StatusEstacao
}