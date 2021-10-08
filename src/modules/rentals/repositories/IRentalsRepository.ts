import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
    create(data: ICreateRentalDTO): Promise<Rental>;
    fidOpenRentalByCar(car_id: string): Promise<Rental>;
    fidOpenRentalByUser(user_id: string): Promise<Rental>;
    findById(id: string): Promise<Rental>;
    findByUserId(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository };
