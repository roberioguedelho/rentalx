import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

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
        name,
        password,
        email,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const user = this.reposiotry.create({
            name,
            password,
            email,
            driver_license,
        });

        await this.reposiotry.save(user);
    }
}

export { UsersRepository };
