import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserRepository } from '../models/users/user.repository';
import { InjectRepository } from '@nestjs/typeorm';

//---Authentication-user-decorator-------------------
@Injectable()
export class AuthGuard implements CanActivate {
        constructor(@InjectRepository(UserRepository) private readonly userRespository: UserRepository) {}

        async canActivate(context: ExecutionContext): Promise<boolean> {
                //current request role
                const request = context.switchToHttp().getRequest();
                const token: string = request.cookies['token'];

                const decode = this.decodeToken(token);
                const user = await this.userRespository.findOneById(decode._id);

                request.user = user;
                return true;
        }

        decodeToken(token: string) {
                try {
                        const decode = <{ _id: string }>jwt.verify(token, process.env.JWT_SECRET_KEY);
                        return decode;
                } catch (_) {
                        throw new UnauthorizedException('Invalid Token');
                }
        }
}
