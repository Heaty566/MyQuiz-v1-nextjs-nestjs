import { Controller, Get, UseGuards, Req, Response } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
        constructor(private readonly authService: AuthService) {}

        @Get('/google')
        @UseGuards(AuthGuard('google'))
        googleAuth() {
                //
        }

        @Get('/google/callback')
        @UseGuards(AuthGuard('google'))
        googleCallBack(@Req() req, @Response() res) {
                const token = this.authService.getToken(req.user);
                console.log(token);
                return res.cookie('token', token).redirect(process.env.CLIENT_URL);
        }
}
