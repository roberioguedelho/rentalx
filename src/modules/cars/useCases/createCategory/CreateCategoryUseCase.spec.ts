import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoryRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {
    beforeEach(() => {
        categoryRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoryRepositoryInMemory
        );
    });

    it("Should be able to create a new category", async () => {
        const category = {
            name: "Category test",
            description: "Category description test",
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await categoryRepositoryInMemory.findByName(
            category.name
        );

        expect(categoryCreated).toHaveProperty("id");
    });

    it("Should not be able to create a new category with name exists", async () => {
        expect(async () => {
            const category = {
                name: "Category test",
                description: "Category description test",
            };

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
