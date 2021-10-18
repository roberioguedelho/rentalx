import { IUsersTokensDTO } from "../../dtos/IUsersTokensDTO";
import { UserToken } from "../../infra/typeorm/entities/UserToken";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    private usersTokens: UserToken[] = [];

    async create({
        user_id,
        expires_date,
        refresh_token,
    }: IUsersTokensDTO): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            user_id,
            expires_date,
            refresh_token,
        });

        this.usersTokens.push(userToken);

        return userToken;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken> {
        const userToken = this.usersTokens.find(
            (userToken) =>
                userToken.user_id === user_id &&
                userToken.refresh_token === refresh_token
        );

        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        const userToken = this.usersTokens.find(
            (userToken) => userToken.user_id === id
        );
        this.usersTokens.splice(this.usersTokens.indexOf(userToken));
    }

    async findByRefreshToken(token: string): Promise<UserToken> {
        const userToken = this.usersTokens.find(
            (userToken) => userToken.refresh_token === token
        );

        return userToken;
    }
}

export { UsersTokensRepositoryInMemory };
