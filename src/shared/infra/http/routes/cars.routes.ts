import { Router } from "express";

import { AddSpecificationController } from "../../../../modules/cars/useCases/addSpecification/AddSpecificationController";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { ListCarController } from "../../../../modules/cars/useCases/listCars/ListCarController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarController = new ListCarController();
const addSpecificationController = new AddSpecificationController();

carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.get("/available", listCarController.handle);

carsRoutes.post(
    "/add-specifications/:id",
    ensureAuthenticated,
    ensureAdmin,
    addSpecificationController.handle
);

export { carsRoutes };
