import { Body, Controller, Get, Post, HttpStatus, Res,Request, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostDto } from './dto/posts.dto';
import { PostsService } from './posts.service';


@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostController {
    constructor(private postService: PostsService) { }

  
    @Get()
    async findAll(@Res() res: Response) {
        const posts = await this.postService.findAll();
        if (posts) {
            res.status(HttpStatus.OK).json({ message: "Successfully Retrieved Posts", body: posts });
        }
        else {
            res.status(HttpStatus.NOT_FOUND)
        }

    }

    @Post()
    async create(@Body() post: CreatePostDto, @Res() res: Response, @Request() req) {
       // post.user=req.user;
        const createdPost = await this.postService.create(post);
       
        if (createdPost) {
            res.status(HttpStatus.CREATED).json({ message: "Successfully Created Post", body: createdPost });
        }
        else {
            res.status(HttpStatus.BAD_REQUEST)
        }
    }

    @Get(':id')
    async find(@Param('id') id: ObjectId, @Res() res: Response) {
        const post = await this.postService.getPost(id)
        if (post) {
            res.status(HttpStatus.OK).json({ message: "Successfully Retrieved Post", body: post });
        }
        else {
            res.status(HttpStatus.NOT_FOUND)
        }
    }

    @Put(':id')
    async update(@Param('id') id: ObjectId, @Body() user: CreatePostDto, @Res() res: Response) {
        const updatedPost = await this.postService.update(id, user)
        if (updatedPost) {
            res.status(HttpStatus.OK).json({ message: "Successfully Updated", data: updatedPost });
        }
        else {
            res.status(HttpStatus.NOT_FOUND)
        }
    }

  
    @Delete(':id')
    async delete(@Param('id') id: ObjectId, @Res() res: Response) {
        const post = await this.postService.delete(id)
        if (post) {
            res.status(HttpStatus.OK).json({ message: "Successfully Deleted" });
        }
        else {
            res.status(HttpStatus.NOT_FOUND)
        }
    }



}
