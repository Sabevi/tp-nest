import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  postUser(userProfileData: CreateUserDto): { userProfileData: CreateUserDto } {
    userProfileData.id = Math.floor(Math.random() * 100000);
    return { userProfileData };
  }
}
