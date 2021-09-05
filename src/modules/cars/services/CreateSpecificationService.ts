import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationService {
    constructor(private specificationsRepository: ISpecificationsRepository) {}

    excute({ name, description }: IRequest): void {
        const specification = this.specificationsRepository.findByName(name);

        if (specification) {
            throw new Error("Specification already exists!");
        }

        this.specificationsRepository.create({
            name,
            description,
        });
    }
}

export { CreateSpecificationService };
