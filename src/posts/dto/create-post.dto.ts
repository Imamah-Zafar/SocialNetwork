import { ObjectId } from "mongoose";
import {IsNotEmpty,IsString} from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";


export class CreatePostDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title:string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    body:string;

    @ApiProperty()
    user: ObjectId
}
