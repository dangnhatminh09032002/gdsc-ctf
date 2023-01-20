import { Injectable, BadRequestException } from '@nestjs/common';
import { auth } from 'src/infrastructure/config/firebaseConfig';
import { Auth } from 'firebase-admin/auth';

@Injectable()
export class AuthService {
  private readonly _firebaseAuth: Auth = auth;
  constructor() {}

  public async validateByIdToken(idToken: string) {
    const res = await this._firebaseAuth.verifyIdToken(idToken).catch((err) => {
      throw new BadRequestException(err.message);
    });

    const user = {
      email: res.email,
    };

    return user;
  }

  async loginWithGoogle(idToken: string) {}

  async validateById(uid: string) {}

  async verifyAccessToken(accessToken: string) {}
}
