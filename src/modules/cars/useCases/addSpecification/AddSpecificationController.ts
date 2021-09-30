import { Request, Response } from "express";
import { container } from "tsyringe";

import { AddSpecificationUseCase } from "./AddSpecificationUseCase";

class AddSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { specifications_id } = request.body;
        const addSpecificationUseCase = container.resolve(
            AddSpecificationUseCase
        );

        const car = await addSpecificationUseCase.execute({
            car_id: id,
            specifications_id,
        });

        return response.json(car);
    }
}

export { AddSpecificationController };
