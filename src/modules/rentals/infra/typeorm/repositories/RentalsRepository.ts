import { getRepository, Repository } from "typeorm";

import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async create({
        id,
        user_id,
        car_id,
        expected_return_date,
        end_date,
        total,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            id,
            user_id,
            car_id,
            expected_return_date,
            end_date,
            total,
        });

        await this.repository.save(rental);

        return rental;
    }

    async fidOpenRentalByCar(car_id: string): Promise<Rental> {
        const rental = await this.repository.findOne({
            where: { car_id, end_date: null },
        });
        return rental;
    }

    async fidOpenRentalByUser(user_id: string): Promise<Rental> {
        const rental = await this.repository.findOne({
            where: { user_id, end_date: null },
        });
        return rental;
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne({ id });
        return rental;
    }
}

export { RentalsRepository };
