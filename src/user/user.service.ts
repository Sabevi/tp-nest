import { Injectable, HttpException } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import * as fs from 'fs';
import { ConfigService } from '../configuration/configuration.service';

@Injectable()
export class UserService {
  constructor(private configService: ConfigService) {}

  private readJSONFile(filePath: string): CreateUserDto[] {
    const data = fs.readFileSync(filePath, 'utf8');
    if (!data || data.length === 0) {
      return [];
    }
    return JSON.parse(data) as CreateUserDto[];
  }

  postUser(
    userProfileData: CreateUserDto,
    filePath: string,
  ): { userProfileData: CreateUserDto } {
    const users: CreateUserDto[] = this.readJSONFile(filePath);
    if (users.find((user) => user.email === userProfileData.email)) {
      throw new HttpException('User already exists', 400);
    }
    userProfileData.id = Math.floor(Math.random() * 100000);
    users.push(userProfileData);
    fs.writeFileSync(filePath, JSON.stringify(users));
    return { userProfileData };
  }
}
