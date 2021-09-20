import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
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

        const result = await authenticateUserUseCase.exucute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user", async () => {
        expect(async () => {
            await authenticateUserUseCase.exucute({
                email: "test@test.com.br",
                password: "12345",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate with incorrect passord", async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "test",
                email: "test@test.com.br",
                password: "12345",
                driver_license: "123456",
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.exucute({
                email: user.email,
                password: "1234",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
