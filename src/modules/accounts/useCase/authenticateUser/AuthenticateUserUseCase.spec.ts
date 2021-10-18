import { DayjsDateProvider } from "../../../../shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvide: DayjsDateProvider;

describe("Authenticate user", () => {
    beforeEach(() => {
        dateProvide = new DayjsDateProvider();
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvide
        );
    });

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            name: "test",
            email: "test@test.com.br",
            password: "12345",
            driver_license: "123456",
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user", async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: "test@test.com.br",
                password: "12345",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"));
    });

    it("should not be able to authenticate with incorrect password", async () => {
        const user: ICreateUserDTO = {
            name: "test",
            email: "test@test.com.br",
            password: "12345",
            driver_license: "123456",
        };

        await createUserUseCase.execute(user);

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: "1234",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"));
    });
});
