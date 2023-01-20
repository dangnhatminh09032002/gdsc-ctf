import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

/*--- ------- ---*/
import { AuthModule } from './auth.module';
import { AuthMiddleware } from 'src/core/common/middlewares/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'local.env',
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class RootModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/');
  }
}
