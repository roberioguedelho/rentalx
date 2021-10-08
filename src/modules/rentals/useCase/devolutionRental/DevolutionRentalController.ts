import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionRentalUseCase } from "./devolutionRentalUseCase";

class DevolutionRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const { rental_id } = request.params;

        const devolutionRentalUseCase = container.resolve(
            DevolutionRentalUseCase
        );

        const rental = await devolutionRentalUseCase.execute({
            rental_id,
            user_id: id,
        });

        return response.status(200).json(rental);
    }
}

export { DevolutionRentalController };
