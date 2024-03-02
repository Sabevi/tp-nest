import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from './configuration/configuration.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot('./users.json')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
