import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listCategoryUserCase = container.resolve(ListCategoriesUseCase);

        const all = await listCategoryUserCase.execute();

        return response.json(all);
    }
}

export { ListCategoriesController };
