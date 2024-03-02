import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { CreateUserDto } from './user/user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  userProfileDto = new CreateUserDto();

  @Post('user')
  createUser(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('secret') secret: string,
  ): { userProfileData: CreateUserDto } {
    if (!firstName || firstName.trim() === '') {
      throw new HttpException(
        'First name is empty or contains only whitespace',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!lastName || lastName.trim() === '') {
      throw new HttpException(
        'Last name is empty or contains only whitespace',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!secret || secret.trim() === '') {
      throw new HttpException(
        'Secret is empty or contains only whitespace',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userProfileDto = new CreateUserDto();
    userProfileDto.firstName = firstName;
    userProfileDto.lastName = lastName;
    userProfileDto.secret = secret;
    return this.userService.postUser(userProfileDto);
  }
}