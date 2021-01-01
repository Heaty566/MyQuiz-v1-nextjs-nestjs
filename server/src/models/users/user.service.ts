import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { ObjectId } from 'mongodb';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class UserService {
        constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {}

        async getUserById(userId: string | ObjectId) {
                const isValid = isValidObjectId(userId);
                if (!isValid) throw new BadRequestException('User with the given Id was invalid');

                const user = this.userRepository.findOneById(userId);

                return user;
        }

        async updateProfile(user: User, { fullName, isTeacher }: UpdateUserDto): Promise<User> {
                user.fullName = fullName;
                user.isTeacher = isTeacher;
                await user.save();
                return user;
        }
}
