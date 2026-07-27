import { IsNotEmpty } from "class-validator"

export class ManutencaoRequestDto {
    
    @IsNotEmpty({ message: "Campo bicicleta obrigatório"})
    bicicletaId: string

    @IsNotEmpty({ message: "Campo responsável obrigatório"})
    responsavelId: string
    
    @IsNotEmpty({ message: "Campo descrição obrigatório"})
    descricao: string
}