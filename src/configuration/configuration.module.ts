import { DynamicModule, Module, Global } from '@nestjs/common';
import { ConfigService } from './configuration.service';

@Global()
@Module({})
export class ConfigModule {
  static forRoot(filePath: string): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: ConfigService,
          useValue: new ConfigService(filePath),
        },
      ],
      exports: [ConfigService],
    };
  }
}
