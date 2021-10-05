import { getRepository, Repository } from "typeorm";

import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async create({
        user_id,
        car_id,
        expected_return_date,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        await this.repository.save(rental);

        return rental;
    }

    async fidOpenRentalByCar(car_id: string): Promise<Rental> {
        const rental = await this.repository.findOne({ car_id });
        return rental;
    }

    async fidOpenRentalByUser(user_id: string): Promise<Rental> {
        const rental = await this.repository.findOne({ user_id });
        return rental;
    }
}

export { RentalsRepository };
