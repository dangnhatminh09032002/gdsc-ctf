import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as _ from 'lodash';

import { AuthService } from 'src/core/services/auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Get('/login')
  async login() {}

  @Get('/logout')
  async logout() {}
}
