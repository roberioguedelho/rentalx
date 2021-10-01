import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpLoadCarImageUseCase } from "./UpLoadCarImageUseCase";

interface IFiles {
    filename: string;
}

class UpLoadCarImageController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const images = request.files as IFiles[];
        const uploadCarImageUseCase = container.resolve(UpLoadCarImageUseCase);

        const images_name = images.map((file) => file.filename);

        await uploadCarImageUseCase.execute({ car_id: id, images_name });

        return response.status(201).send();
    }
}

export { UpLoadCarImageController };
