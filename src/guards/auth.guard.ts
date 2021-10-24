import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      return false;
    }

    const [bearer, token] = request.headers.authorization.split(' ');

    if (bearer !== 'Bearer') {
      return false;
    }
    if (!token) {
      return false;
    }

    const account = this.verifyToken(token);

    request.account = account;
    // return validateRequest(request);
    return true;
  }

  verifyToken(token: string): Promise<{ id: string }> {
    try {
      const account = jwt.verify(token, process.env.jwt);

      return account;
    } catch (err) {
      console.log(err.message);
      throw new UnauthorizedException();
    }

    // return new Promise((resolve, reject) => {
    //   jwt.verify(token, process.env.jwt, (err, payload) => {
    //     if (err) return reject(err);
    //     resolve(payload);
    //   });
    // });
  }
}
