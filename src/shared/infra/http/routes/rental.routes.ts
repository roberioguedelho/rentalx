import { Router } from "express";

import { CreateRentalController } from "../../../../modules/rentals/useCase/CreateRental/CreateRentalController";
import { DevolutionRentalController } from "../../../../modules/rentals/useCase/devolutionRental/DevolutionRentalController";
import { ListRentalByUserController } from "../../../../modules/rentals/useCase/ListRentalByUser/ListRentalByUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalByUserController = new ListRentalByUserController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
    "/devolution/:rental_id",
    ensureAuthenticated,
    devolutionRentalController.handle
);
rentalRoutes.get(
    "/user",
    ensureAuthenticated,
    listRentalByUserController.handle
);

export { rentalRoutes };
