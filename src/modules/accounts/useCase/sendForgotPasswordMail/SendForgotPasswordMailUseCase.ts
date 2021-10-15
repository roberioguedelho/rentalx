import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/mailProvider/IMailProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvide: IDateProvider,
        @inject("EtherealMailProvider")
        private mailProvide: IMailProvider
    ) {}
    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("User does not exists!");
        }

        const token = uuidV4();

        await this.usersTokensRepository.create({
            refresh_token: token,
            expires_date: this.dateProvide.addHours(3),
            user_id: user.id,
        });

        await this.mailProvide.sendMail(
            email,
            "Recuperação de senha",
            `O link para o reset é ${token}`
        );
    }
}

export { SendForgotPasswordMailUseCase };
