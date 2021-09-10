import { Body, Controller, Get, Post, Request, HttpStatus, Res, Param, Put, Delete, UseGuards, Inject, forwardRef } from '@nestjs/common';
import { Response } from 'express';
import { ObjectId } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './user.service'


@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService, 
        private authService: AuthService) { }


    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Res() res: Response) {
        console.log(process.env.PASSWORD)
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
    async create(@Body() user: CreateUserDto, @Res() res: Response) {
        const createdUser = await this.usersService.create(user);
        if (createdUser) {
            res.status(HttpStatus.CREATED).json({ message: "Successfully Created User", body: createdUser });
        }
        else {
            res.status(HttpStatus.BAD_REQUEST)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async find(@Param('id') id: ObjectId, @Res() res: Response) {
        const user = await this.usersService.getProfile(id)
        if (user) {
            res.status(HttpStatus.OK).json({ message: "Successfully Retrieved Users", body: user });
        }
        else {
            res.status(HttpStatus.NOT_FOUND)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: ObjectId, @Body() user: CreateUserDto, @Res() res: Response) {
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



}
