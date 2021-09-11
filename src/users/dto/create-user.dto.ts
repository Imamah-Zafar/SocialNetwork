import { IsNotEmpty, IsString, IsEmail } from 'class-validator'
import { Exclude } from 'class-transformer';
import { User } from '../schema/user.schema';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
     @IsString()
   
    password?: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;


  
}