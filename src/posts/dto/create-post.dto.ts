import { ObjectId } from "mongoose";
import {IsNotEmpty,IsString} from 'class-validator'


export class CreatePostDto{
    @IsNotEmpty()
    @IsString()
    title:string;

    @IsNotEmpty()
    @IsString()
    body:string;

 
    user: ObjectId
}
