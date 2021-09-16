import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PostsService } from 'src/posts/posts.service';
import { PaginationDto } from '../pagination/pagination.dto';
import { PaginatedPostResultDto } from 'src/pagination/paginatedPostResult.dto';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private postService: PostsService) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await new this.userModel(createUserDto).save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async getProfile(id: ObjectId): Promise<User> {
    return await this.userModel.findById(id, { password: 0 })
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async delete(id: ObjectId): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username: username }).select('+password');
  }

  async follow(id: ObjectId, userToFollow: ObjectId): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id,
      {
        $push: { "following": userToFollow }
      }
    )
  }

  async unfollow(id: ObjectId, userToFollow: ObjectId): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id,
      {
        $pull: { "following": userToFollow }
      }
    )
  }

  async getFeed(following: ObjectId[], paginationDto: PaginationDto): Promise<PaginatedPostResultDto> {
    const feed = await this.postService.feed(following, paginationDto.query)
    const totalCount = feed.length
    if (totalCount === 0) {
      return null
    }
    else {
      return {
        totalCount,
        page: paginationDto.page,
        limit: paginationDto.limit,
        data: feed.splice(paginationDto.page - 1, paginationDto.limit)

      }
    }
  }

}
