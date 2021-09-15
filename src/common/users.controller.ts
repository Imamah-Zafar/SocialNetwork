import { Body, Controller, Query, Get, Post, Request, HttpStatus, Res, Param, Put, Delete, UseGuards, Inject, forwardRef, UsePipes, ValidationPipe, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { ObjectId } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { PaginationDto } from '../pagination/pagination.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/user.service'
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
const saltOrRounds = 10;

@ApiBearerAuth()
@ApiTags('User')
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService) { }


    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Res() res: Response) {
        const users = await this.usersService.findAll();
        if (users) {
            res.status(HttpStatus.OK).json({ message: "Successfully Retrieved Users", body: users });
        }
        else {
            res.status(HttpStatus.NOT_FOUND)
        }

    }


    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }


    @Post()
    async create(@Body(new ValidationPipe()) user: CreateUserDto, @Res() res: Response) {
        const hash = await bcrypt.hash(user.password, saltOrRounds);
        user.password = hash;
        const checkUser = await this.usersService.findOne(user.username)
        if (checkUser) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: "Username already in use " });
        }
        else {
            const createdUser = await this.usersService.create(user);
            if (createdUser) {
                res.status(HttpStatus.CREATED).json({ message: "Successfully Created User", body: createdUser });
            }
            else {
                res.status(HttpStatus.BAD_REQUEST)
            }
        }
    }


    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    async find(@Res() res: Response, @Request() req) {
        const id = req.user.userId;
        const user = await this.usersService.getProfile(id)

        if (user) {
            res.status(HttpStatus.OK).json({ message: "Successfully Retrieved Profile", body: user });
        }
        else {
            res.status(HttpStatus.NOT_FOUND)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async update(@Body(new ValidationPipe()) user: UpdateUserDto, @Res() res: Response, @Request() req) {
        const id = req.user.userId;
        const updatedUser = await this.usersService.update(id, user)
        if (updatedUser) {
            res.status(HttpStatus.OK).json({ message: "Successfully Updated", data: updatedUser });
        }
        else {
            res.status(HttpStatus.NOT_FOUND)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: ObjectId, @Res() res: Response) {
        const user = await this.usersService.delete(id)
        if (user) {
            res.status(HttpStatus.OK).json({ message: "Successfully Deleted" });
        }
        else {
            res.status(HttpStatus.NOT_FOUND)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('/follow/:id')
    async follow(@Param('id') id: ObjectId, @Res() res: Response, @Request() req) {

        const user = await this.usersService.follow(req.user.userId, id);
        if (user) {
            res.status(HttpStatus.OK).json({ message: "Successfully Followed User", data: user });
        }
        else {
            res.status(HttpStatus.NOT_FOUND)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('/unfollow/:id')
    async unfollow(@Param('id') id: ObjectId, @Res() res: Response, @Request() req) {

        const user = await this.usersService.unfollow(req.user.userId, id);
        if (user) {
            res.status(HttpStatus.OK).json({ message: "Successfully Unfollowed User" });
        }
        else {
            res.status(HttpStatus.NOT_FOUND)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/feed')
    async getFeed(@Query() paginationDto: PaginationDto, @Res() res: Response, @Request() req) {
        paginationDto.page = Number(paginationDto.page)||1
        paginationDto.limit = Number(paginationDto.limit)|| 2
        const feed = await this.usersService.getFeed(req.user.following, paginationDto)
        if (feed) {
            res.status(HttpStatus.OK).json({ message: "Successfully Retrieved Feed", data: feed });
        }
        else {
            res.status(HttpStatus.NOT_FOUND)
        }
    }




}
