import { IDateProvider } from "../../../shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "../../../shared/errors/AppError";
import { Rental } from "../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../repositories/IRentalsRepository";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalUseCase {
    constructor(
        private rentalsRepository: IRentalsRepository,
        private dateProvider: IDateProvider
    ) {}
    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const minimumHour = 24;

        const carUnavailable = await this.rentalsRepository.fidOpenRentalByCar(
            car_id
        );

        if (carUnavailable) {
            throw new AppError("Car is unavailable");
        }

        const rentalOpenToUser =
            await this.rentalsRepository.fidOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new AppError("There's a rentals in progress for user!");
        }

        const compare = this.dateProvider.compareInHours(
            this.dateProvider.dateNow(),
            expected_return_date
        );

        if (compare < minimumHour) {
            throw new AppError("Invalid return date!");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalUseCase };