import { inject, injectable } from "tsyringe";

import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}
@injectable()
class ListCarsUseCase {
    constructor(
        @inject("CarRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({ name, brand, category_id }: IRequest): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable(
            brand,
            category_id,
            name
        );

        return cars;
    }
}

export { ListCarsUseCase };
