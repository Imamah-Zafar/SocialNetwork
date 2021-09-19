import { Body, Controller, Get, Post, HttpStatus, Res, Param, Put, Request, Delete, UseGuards, Query, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationDto } from '../pagination/pagination.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { io } from 'socket.io-client';




@ApiBearerAuth()
@ApiTags('Post')
@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostController {
    constructor(private postService: PostsService) { }


    @Get()
    async findAll(@Query() paginationDto: PaginationDto, @Res() res: Response, @Request() req) {
        const id = req.user.userId;
        paginationDto.page = Number(paginationDto.page)
        paginationDto.limit = Number(paginationDto.limit)
        const posts = await this.postService.findAll(id, {
            ...paginationDto,
            limit: paginationDto.limit > 10 ? 10 : paginationDto.limit
        });
        if (posts) {
            res.status(HttpStatus.OK).json({ message: "Successfully Retrieved Posts", body: posts });
        }
        else {
            res.status(HttpStatus.NOT_FOUND)
        }

    }

    @Post()
    async create(@Body(new ValidationPipe()) post: CreatePostDto, @Res() res: Response, @Request() req) {

        post.user = req.user.userId;
        const createdPost = await this.postService.create(post);

        if (createdPost) {
            res.status(HttpStatus.CREATED).json({ message: "Successfully Created Post", body: createdPost });

            const payload = { title: post.title, body: post.body }
            const data = { payload: payload, room: req.user.userId }
            const socket = io('http://localhost:3000')
            socket.emit('msgToServer', data)
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
    async update(@Param('id') id: ObjectId, @Body() user: UpdatePostDto, @Res() res: Response) {
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
