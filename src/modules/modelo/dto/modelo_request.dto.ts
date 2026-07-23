import { IsNotEmpty } from "class-validator"

export class ModeloRequestDto {
    
    @IsNotEmpty()
    nome: string
    
    @IsNotEmpty()
    marcaId: string
}