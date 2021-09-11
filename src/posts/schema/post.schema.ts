import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schema/user.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post{
  @Prop({required:true})
  title: string;

  @Prop({required:true})
  body: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"})
    user:mongoose.Schema.Types.ObjectId
    
  
}

export const PostSchema = SchemaFactory.createForClass(Post);