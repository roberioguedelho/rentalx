import { IUsersTokensDTO } from "../dtos/IUsersTokensDTO";
import { UserToken } from "../infra/typeorm/entities/UserToken";

interface IUsersTokensRepository {
    create(data: IUsersTokensDTO): Promise<UserToken>;
}

export { IUsersTokensRepository };
