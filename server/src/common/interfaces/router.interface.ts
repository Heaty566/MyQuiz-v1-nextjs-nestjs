import { Request } from '@nestjs/common';
import { User } from '../../models/users/user.entity';

export interface CusRequest extends Request {
        user: User;
}
