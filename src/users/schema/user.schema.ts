import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({required:true})
  username: string;

  @Prop({required:true, select:false})
  password: string;

  @Prop()
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId,
    ref: "Users"})
    following:[mongoose.Schema.Types.ObjectId]
}

export const UserSchema = SchemaFactory.createForClass(User);