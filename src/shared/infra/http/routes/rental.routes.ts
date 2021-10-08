import { Router } from "express";

import { CreateRentalController } from "../../../../modules/rentals/useCase/CreateRental/CreateRentalController";
import { DevolutionRentalController } from "../../../../modules/rentals/useCase/devolutionRental/DevolutionRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
    "/devolution/:rental_id",
    ensureAuthenticated,
    devolutionRentalController.handle
);

export { rentalRoutes };
