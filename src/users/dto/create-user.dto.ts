import { IsNotEmpty, IsString, IsEmail } from 'class-validator'
import { Exclude } from 'class-transformer';
import { User } from '../schema/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
     @IsString()
     @ApiProperty()
    password?: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    firstName: string;

    @IsString()
    @ApiProperty()
    lastName: string;


  
}