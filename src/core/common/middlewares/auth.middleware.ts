import {
  Injectable,
  NestMiddleware,
  Req,
  Next,
  BadRequestException,
} from '@nestjs/common';
import * as _ from 'lodash';
import { Request, NextFunction } from 'express';
import { AuthService } from 'src/core/services/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly _authService: AuthService) {}

  async use(@Req() req: Request, @Next() next: NextFunction) {
    const id_token = _.get(req, 'session.id_token');

    if (!id_token) throw new BadRequestException('Authorization failed');

    const user = await this._authService
      .validateByIdToken(id_token)
      .catch(() => {
        throw new BadRequestException('Authorization failed');
      });
    _.set(req, 'user', user);
    return next();
  }
}
