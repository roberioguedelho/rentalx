import { Specification } from "../../infra/typeorm/entities/Specification";
import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
    specifications: Specification[] = [];

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
        });

        this.specifications.push(specification);

        return specification;
    }
    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(
            (specification) => specification.name === name
        );
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = this.specifications.filter((specification) =>
            ids.includes(specification.id)
        );

        return specifications;
    }
}

export { SpecificationRepositoryInMemory };
