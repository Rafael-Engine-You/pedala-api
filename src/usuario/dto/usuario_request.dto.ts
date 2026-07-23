import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, Length, MinLength, ValidationArguments } from "class-validator";
import { UsuarioPapel } from "../papel.enun";

export class UsuarioRequestDto {
    
    @IsNotEmpty({message: "Campo NOME é obrigatório"})
    @MinLength(6, {
        message: (args: ValidationArguments) =>
            `O campo '${args.property}' deve conter no mínimo 
        ${args.constraints[0]} caracteres.`,
    })
    nome:string
    
    @IsEmail()
    @IsNotEmpty({message: "Campo EMAIL é obrigatório"})
    email: string

    @IsEmpty({message: "Campo SENHA é obrigatório"})
    @MinLength(6, {
        message: (args: ValidationArguments) =>
        `O campo '${args.property}' deve conter no mínimo 
            ${args.constraints[0]} caracteres.`,
    })
    senha:string

    @IsOptional()
    @IsEnum(UsuarioPapel)
    perfil: UsuarioPapel

    @IsPhoneNumber("BR")
    @IsNotEmpty()
    contato:string
}