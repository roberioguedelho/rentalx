import { AppError } from "../../../../shared/errors/AppError";
import { CarRepositoryInMemory } from "../../repositories/in-memory/CarRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationRepositoryInMemory";
import { AddSpecificationUseCase } from "./AddSpecificationUseCase";

let addSpecificationUseCase: AddSpecificationUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Add specification", () => {
    beforeEach(() => {
        carRepositoryInMemory = new CarRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
        addSpecificationUseCase = new AddSpecificationUseCase(
            carRepositoryInMemory,
            specificationRepositoryInMemory
        );
    });

    it("Should be able to add a new specification to the car", async () => {
        expect(async () => {
            const car_id = "123";
            const specifications_id = ["blabls"];
            await addSpecificationUseCase.execute({
                car_id,
                specifications_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be able to add a new specification to the car", async () => {
        const car = await carRepositoryInMemory.create({
            name: "Name car",
            description: "Description car",
            daily_rate: 100,
            license_plate: "abc-123",
            fine_amount: 60,
            brand: "brand",
            category_id: "category",
        });

        const specification = await specificationRepositoryInMemory.create({
            name: "test_name",
            description: "test_description",
        });

        const carSpecification = await addSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id: [specification.id],
        });

        expect(carSpecification).toHaveProperty("specifications");

        expect(carSpecification.specifications).toEqual([specification]);
    });
});
