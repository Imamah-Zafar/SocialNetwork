import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {  User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await new this.userModel(createUserDto).save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async getProfile(id: ObjectId):Promise<User>{
    return await this.userModel.findById(id);
  }

  async update(id: ObjectId, updateUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async delete(id:  ObjectId): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({email: email});
  }
}
