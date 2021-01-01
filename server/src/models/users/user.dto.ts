import { userValidator } from '../../common/validators/user.validator';
import * as Joi from 'joi';

export class UpdateUserDto {
        fullName: string;
        isTeacher: boolean;

        static validator() {
                const schema = userValidator(['fullName', 'isTeacher']);
                return Joi.object(schema);
        }
}
