import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequest {
    userId: string;
    avatarFilename?: string;
}

class UpdateUserAvatarService {
    public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found');
        }

        if (user.avatar) {
            const userAvatarFilepath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilepath);

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilepath);
            }
        }

        user.avatar = avatarFilename;

        await userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
