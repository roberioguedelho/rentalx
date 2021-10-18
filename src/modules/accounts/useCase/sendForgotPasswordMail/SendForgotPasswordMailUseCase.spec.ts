import { DayjsDateProvider } from "../../../../shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/mailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

let usersRepository: UsersRepositoryInMemory;
let usersTokensRepository: UsersTokensRepositoryInMemory;
let dateProvide: DayjsDateProvider;
let mailProvide: MailProviderInMemory;

describe("Send forgot mail", () => {
    beforeEach(() => {
        usersRepository = new UsersRepositoryInMemory();
        usersTokensRepository = new UsersTokensRepositoryInMemory();
        dateProvide = new DayjsDateProvider();
        mailProvide = new MailProviderInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepository,
            usersTokensRepository,
            dateProvide,
            mailProvide
        );
    });

    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProvide, "sendMail");

        await usersRepository.create({
            driver_license: "514753",
            email: "cirra@zegal.bj",
            name: "Mae Higgins",
            password: "12345",
        });

        await sendForgotPasswordMailUseCase.execute("cirra@zegal.bj");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send an email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("po@kiol.rw")
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("should be able to create an users token", async () => {
        const generateTokenMail = jest.spyOn(usersRepository, "create");

        await usersRepository.create({
            driver_license: "5134753",
            email: "Ccirra@zegal.bj",
            name: "Ble Higgins",
            password: "12345",
        });

        await sendForgotPasswordMailUseCase.execute("Ccirra@zegal.bj");

        expect(generateTokenMail).toHaveBeenCalled();
    });
});
