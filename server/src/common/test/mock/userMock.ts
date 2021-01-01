import { User } from '../../../models/users/user.entity';
import { fakeData } from './mockData';

export const mockUser = (isTeacher: boolean = false): User => {
        const newUser = new User();
        newUser.fullName = fakeData(8, 'letters');
        newUser.isTeacher = isTeacher;
        newUser.email = fakeData(8, 'lettersAndNumbersLowerCase') + '@gmail.com';

        return newUser;
};
