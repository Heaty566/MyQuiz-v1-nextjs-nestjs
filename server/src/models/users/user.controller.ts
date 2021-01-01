import { Controller, Put, Request, UsePipes, Body, UseGuards, Get } from '@nestjs/common';

import { JoiValidatorPipe } from '../../common/pipes/validator.pipe';
import { UpdateUserDto } from './user.dto';
import { AuthGuard } from '../../authentication/auth.guard';
import { CusRequest } from '../../common/interfaces/router.interface';
import { UserService } from './user.service';
import * as _ from 'lodash';
import { User } from './user.entity';

@Controller('/user')
export class UserController {
        constructor(private readonly userService: UserService) {}

        @Put('/profile')
        @UseGuards(AuthGuard)
        @UsePipes(new JoiValidatorPipe(UpdateUserDto.validator()))
        async putProfile(@Request() req: CusRequest, @Body() input: UpdateUserDto) {
                const user = await this.userService.updateProfile(req.user, input);

                return { message: 'Updated user', data: user };
        }

        @Get('/')
        @UseGuards(AuthGuard)
        async getUser(@Request() req: CusRequest) {
                return { data: _.pick<User>(req.user, ['isTeacher', 'fullName', 'avatarUrl']) };
        }
}
