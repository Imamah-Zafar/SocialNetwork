import { Module } from '@nestjs/common';
import { Post, PostSchema } from './schema/post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from './posts.service';
import { PostController } from './posts.controller';

@Module({
    imports:[
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema}]),
    ],
    providers:[PostsService],
    controllers:[PostController],
    exports:[PostsService]
})
export class PostsModule {}
