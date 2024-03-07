import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from './configuration/configuration.module';
import { IpCheckMiddleware } from './ip.middleware';

@Module({
  imports: [UserModule, ConfigModule.forRoot('./users.json')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IpCheckMiddleware).forRoutes('*');
  }
}
