import { getRepository, Repository } from "typeorm";

import { IUsersTokensDTO } from "../../../dtos/IUsersTokensDTO";
import { IUsersTokensRepository } from "../../../repositories/IUsersTokensRepository";
import { UserToken } from "../entities/UserToken";

class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserToken>;

    constructor() {
        this.repository = getRepository(UserToken);
    }

    async create({
        user_id,
        expires_date,
        refresh_token,
    }: IUsersTokensDTO): Promise<UserToken> {
        const userToken = this.repository.create({
            user_id,
            refresh_token,
            expires_date,
        });

        await this.repository.save(userToken);

        return userToken;
    }
}

export { UsersTokensRepository };
