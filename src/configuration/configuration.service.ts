import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ConfigService {
  private readonly configData: any;
  private readonly filePath: string;

  constructor(fileName: string) {
    this.filePath = this.getFilePath(fileName);
    this.configData = this.readJsonFile(this.filePath);
  }

  get(key: string): any {
    return this.configData[key];
  }

  getFilePath(fileName: string): string {
    return path.join(__dirname, '..', '..', 'src', 'database', fileName);
  }

  private readJsonFile(filePath: string): any {
    const data = fs.readFileSync(filePath, 'utf8');
    if (!data || data.length === 0) {
      return {};
    }
    return JSON.parse(data);
  }
}
