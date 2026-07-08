import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from "class-validator";

export class UsuarioRequestDto {
    
    @IsNotEmpty()
    @MinLength(6)
    nome:string
    
    @IsEmail()
    email: string

    @IsPhoneNumber()
    @IsNotEmpty()
    contato:string
}