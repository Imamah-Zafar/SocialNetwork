import { Body, Controller, Get, Post, Request, HttpStatus, Res, Param, Put, Delete, UseGuards, Inject, forwardRef, UsePipes, ValidationPipe, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { ObjectId } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './user.service'
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
const saltOrRounds = 10;



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
        const createdUser = await this.usersService.create(user);
        if (createdUser) {
            res.status(HttpStatus.CREATED).json({ message: "Successfully Created User", body: createdUser });
        }
        else {
            res.status(HttpStatus.BAD_REQUEST)
        }
    }

 
    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    async find( @Res() res: Response,@Request() req) {
        const id=req.user.userId;
        const user = await this.usersService.getProfile(id)
   
        if (user) {
            res.status(HttpStatus.OK).json({ message: "Successfully Retrieved Profile", body: user});
        }
        else {
            res.status(HttpStatus.NOT_FOUND)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async update( @Body(new ValidationPipe()) user: UpdateUserDto, @Res() res: Response,@Request() req) {
        const id=req.user.userId;
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
