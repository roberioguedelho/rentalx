import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
    private reposiotry: Repository<User>;

    constructor() {
        this.reposiotry = getRepository(User);
    }
    async findById(id: string): Promise<User> {
        const user = await this.reposiotry.findOne(id);

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.reposiotry.findOne({ email });

        return user;
    }

    async create({
        id,
        name,
        password,
        email,
        driver_license,
        avatar,
    }: ICreateUserDTO): Promise<void> {
        const user = this.reposiotry.create({
            id,
            name,
            password,
            email,
            driver_license,
            avatar,
        });

        await this.reposiotry.save(user);
    }
}

export { UsersRepository };
