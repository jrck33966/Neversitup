import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(username: any, pass: any) {
        const user = await this.usersService.findOne(username);
        const chk = await this.usersService.chkPassword(pass, user?.password);
        if (!chk) {
            throw new UnauthorizedException();
        }
        const payload = { username: user.username, userId: user.userId };
        return {
            statusCode: 200,
            message: 'succee',
            token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(username: any, password: any) {
        let userModel = {
            username: username,
            password: password
        }
        const user = await this.usersService.createOne(userModel);
        return user
    }
}