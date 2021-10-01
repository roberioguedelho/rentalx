import { getRepository, Repository } from "typeorm";

import { ICarImageRepository } from "../../../repositories/ICarImageRepository";
import { CarImage } from "../entities/CarImage";

class CarImageRepository implements ICarImageRepository {
    private repository: Repository<CarImage>;

    constructor() {
        this.repository = getRepository(CarImage);
    }

    async create(car_id: string, image_name: string): Promise<CarImage> {
        const carImage = this.repository.create({
            car_id,
            image_name,
        });

        await this.repository.save(carImage);

        return carImage;
    }
}

export { CarImageRepository };
