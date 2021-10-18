import { IUsersTokensDTO } from "../dtos/IUsersTokensDTO";
import { UserToken } from "../infra/typeorm/entities/UserToken";

interface IUsersTokensRepository {
    create(data: IUsersTokensDTO): Promise<UserToken>;
    findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken>;
    deleteById(id: string): Promise<void>;
    findByRefreshToken(token: string): Promise<UserToken>;
}

export { IUsersTokensRepository };
