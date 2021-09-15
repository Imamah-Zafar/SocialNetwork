import { ObjectId } from "mongoose";
import {IsNotEmpty,IsString} from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePostDto{

    @IsString()
    title:string;

    @IsString()

    body:string;
}