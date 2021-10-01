import { Router } from "express";
import multer from "multer";

import uploadConfg from "../../../../config/upload";
import { AddSpecificationController } from "../../../../modules/cars/useCases/addSpecification/AddSpecificationController";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { ListCarController } from "../../../../modules/cars/useCases/listCars/ListCarController";
import { UpLoadCarImageController } from "../../../../modules/cars/useCases/uploadCarImage/UpLoadCarImageController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarController = new ListCarController();
const addSpecificationController = new AddSpecificationController();
const upLoadCarImageController = new UpLoadCarImageController();

const upload = multer(uploadConfg.upload("./tmp/cars"));

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

carsRoutes.post(
    "/images/:id",
    ensureAuthenticated,
    ensureAdmin,
    upload.array("images"),
    upLoadCarImageController.handle
);

export { carsRoutes };
