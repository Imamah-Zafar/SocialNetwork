import {IsNotEmpty, IsString, IsEmail} from 'class-validator'

export class UpdateUserDto{
 
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsString()
    firstName:string;

    @IsString()
    lastName:string;
}