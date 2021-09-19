import { IsNotEmpty, IsString, IsEmail } from 'class-validator'


export class LoginUserDto {

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
     @IsString()

    password?: string;

}