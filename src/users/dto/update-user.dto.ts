import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsString, IsEmail} from 'class-validator'

export class UpdateUserDto{
 
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email:string;

    @IsString()
    @ApiProperty()
    firstName:string;

    @IsString()
    @ApiProperty()
    lastName:string;
}