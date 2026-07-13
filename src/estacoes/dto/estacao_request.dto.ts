import { IsInt, IsNotEmpty, IsOptional, MinLength, 
    ValidationArguments } from "class-validator"

export class EstacaoRequestDto {
    
    @IsNotEmpty({ message: "Campo nome é obrigatório"})
    @MinLength(6,{
        message: (args: ValidationArguments) =>
      `O campo ${args.property} deve conter no mínimo 
                            ${args.constraints[0]} caracteres.`,
    })
    nome: string
    
    @IsNotEmpty({ message: "Campo capacidade é obrigatório"})
    @IsInt()
    capacidade: number

    @IsOptional()
    ativo: boolean
}