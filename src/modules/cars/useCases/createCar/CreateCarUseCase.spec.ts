import { AppError } from "../../../../shared/errors/AppError";
import { CarRepositoryInMemory } from "../../repositories/in-memory/CarRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsReposytory: CarRepositoryInMemory;

describe("Create car", () => {
    beforeEach(() => {
        carsReposytory = new CarRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsReposytory);
    });

    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name car",
            description: "Description car",
            daily_rate: 100,
            license_plate: "abc-123",
            fine_amount: 60,
            brand: "brand",
            category_id: "category",
        });

        expect(car).toHaveProperty("id");
    });

    it("Should not be able to create a new car with existis license plate", async () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Name car 1",
                description: "Description car",
                daily_rate: 100,
                license_plate: "abc-123",
                fine_amount: 60,
                brand: "brand",
                category_id: "category",
            });

            await createCarUseCase.execute({
                name: "Name car 2",
                description: "Description car",
                daily_rate: 100,
                license_plate: "abc-123",
                fine_amount: 60,
                brand: "brand",
                category_id: "category",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Name car",
            description: "Description car",
            daily_rate: 100,
            license_plate: "abc-123",
            fine_amount: 60,
            brand: "brand",
            category_id: "category",
        });

        expect(car.available).toBe(true);
    });
});
