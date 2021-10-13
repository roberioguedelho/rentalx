import dayjs from "dayjs";

import { DayjsDateProvider } from "../../../../shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { CarRepositoryInMemory } from "../../../cars/repositories/in-memory/CarRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carRepositoryInMemory: CarRepositoryInMemory;

describe("Create rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        carRepositoryInMemory = new CarRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carRepositoryInMemory
        );
    });

    it("should be able to create a new rental", async () => {
        const car = await carRepositoryInMemory.create({
            name: "test",
            description: "car test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "12345",
            brand: "brand test",
        });

        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "car_1",
            expected_return_date: dayAdd24Hours,
            user_id: "user_1",
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "user_1",
                car_id: "car_2",
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(
            new AppError("There's a rentals in progress for user!")
        );
    });

    it("should not be able to create a new rental if there is another open to the same car", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "car_1",
            expected_return_date: dayAdd24Hours,
            user_id: "user_1",
        });
        await expect(
            createRentalUseCase.execute({
                user_id: "user_2",
                car_id: "car_1",
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppError("Car is unavailable"));
    });

    it("should not be able to create a new rental with invalid return date", async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: "user_1",
                car_id: "car_1",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError("Invalid return date!"));
    });
});
