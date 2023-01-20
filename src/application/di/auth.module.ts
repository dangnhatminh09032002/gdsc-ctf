import { Module } from '@nestjs/common';
import { AuthService } from 'src/core/services/auth.service';
import { AuthController } from '../apis/auth/auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
