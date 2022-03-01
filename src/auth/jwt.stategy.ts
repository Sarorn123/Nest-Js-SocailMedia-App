import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { keys } from '../../Keys/keys';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, //false in production
      secretOrKey: keys.SECRET_KEY,
    });
  }

  async validate(payload: any) {
    const id = payload.sub;
    return { ...payload, id };
  }
}
