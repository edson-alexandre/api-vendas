import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entites/User';

interface IRequest {
    name: string;
    email: string;
    password: string;
    avatar: string;
}

class CreateUserService {
    public async execute({ name, email, password }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const emailExists = await usersRepository.findByEmail(email);
        if (emailExists) {
            throw new AppError('E-mail address alreayd used');
        }

        const user = usersRepository.create({
            name,
            email,
            password,
        });
        await usersRepository.save(user);
        return user;
    }
}

export default CreateUserService;
