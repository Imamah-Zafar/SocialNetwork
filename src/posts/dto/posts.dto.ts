import { ObjectId } from "mongoose";
//import { User } from "src/users/schema/user.schema";

export class CreatePostDto{
    title:string;
    body:string;
   // user: ObjectId
}