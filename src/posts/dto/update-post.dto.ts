import { ObjectId } from "mongoose";
import {IsNotEmpty,IsString} from 'class-validator'

export class UpdatePostDto{

    @IsString()
    title:string;

    @IsString()
    body:string;
}