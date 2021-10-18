import { CarRepositoryInMemory } from "../../repositories/in-memory/CarRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

describe("List cars", () => {
    beforeEach(() => {
        carRepositoryInMemory = new CarRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carRepositoryInMemory);
    });

    it("Should be able to list all available cars", async () => {
        const car = await carRepositoryInMemory.create({
            name: "car1",
            description: "description car",
            daily_rate: 140,
            license_plate: "DEF-1234",
            fine_amount: 100,
            brand: "Audi",
            category_id: "78ddd283-e91c-4714-a423-05601c431712",
        });

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by brand", async () => {
        const car = await carRepositoryInMemory.create({
            name: "car2",
            description: "description car2",
            daily_rate: 140,
            license_plate: "DEF-12345",
            fine_amount: 100,
            brand: "brand_test",
            category_id: "78ddd283-e91c-4714-a423-05601c431712",
        });

        const cars = await listCarsUseCase.execute({
            brand: "brand_test",
        });

        expect(cars).toEqual([car]);
    });
});
