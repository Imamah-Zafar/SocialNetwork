import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post ,  PostDocument } from './schema/post.schema';
import { CreatePostDto } from './dto/posts.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createUserDto: CreatePostDto): Promise<Post> {
    return await new this.postModel(createUserDto).save();
  }

  async findAll(): Promise<Post[]> {
    return await this.postModel.find();
  }

  async getPost(id: ObjectId):Promise<Post>{
    return await this.postModel.findById(id);
  }

  async update(id: ObjectId, updateUserDto: CreatePostDto): Promise<Post> {
    return await this.postModel.findByIdAndUpdate(id, updateUserDto);
  }

  async delete(id:  ObjectId): Promise<Post> {
    return await this.postModel.findByIdAndDelete(id);
  }
}
