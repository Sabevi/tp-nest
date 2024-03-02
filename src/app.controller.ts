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
import { ConfigService } from './configuration/configuration.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserService,
    private configService: ConfigService,
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
    @Body('email') email: string,
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
    if (!email || email.trim() === '') {
      throw new HttpException(
        'Email is empty or contains only whitespace',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!secret || secret.trim() === '') {
      throw new HttpException(
        'Secret is empty or contains only whitespace',
        HttpStatus.BAD_REQUEST,
      );
    }
    const filePath = this.configService.getFilePath('users.json');
    const userProfileDto = new CreateUserDto();
    userProfileDto.firstName = firstName;
    userProfileDto.lastName = lastName;
    userProfileDto.email = email;
    userProfileDto.secret = secret;
    return this.userService.postUser(userProfileDto, filePath);
  }
}
