import { ObjectId } from "mongoose";
import {IsNotEmpty,IsString} from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePostDto{

    @IsString()
    @ApiProperty()
    title:string;

    @IsString()
    @ApiProperty()
    body:string;
}