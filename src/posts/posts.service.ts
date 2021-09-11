import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post ,  PostDocument } from './schema/post.schema';
import { CreatePostDto} from './dto/create-post.dto';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedPostResultDto } from './dto/paginatedPostResult.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createUserDto: CreatePostDto): Promise<Post> {
    return await new this.postModel(createUserDto).save();
  }

  async findAll(id: ObjectId,paginationDto: PaginationDto): Promise<PaginatedPostResultDto> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    const totalCount =await this.postModel.count()
    const foundPost= await this.postModel.find({ user: id}).populate("posts").skip(skippedItems).limit(paginationDto.limit);
    return{
    totalCount,
    page: paginationDto.page,
    limit: paginationDto.limit,
    data:  foundPost}
  }

  async getPost(id: ObjectId):Promise<Post>{
    return await this.postModel.findById(id);
  }


  async update(id: ObjectId, updateUserDto: UpdatePostDto): Promise<Post> {
    return await this.postModel.findByIdAndUpdate(id, updateUserDto);
  }

  async delete(id:  ObjectId): Promise<Post> {
    return await this.postModel.findByIdAndDelete(id);
  }
}
