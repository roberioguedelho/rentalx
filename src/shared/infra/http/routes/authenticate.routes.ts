import { Router } from "express";

import { AuthenticateUserController } from "../../../../modules/accounts/useCase/authenticateUser/AuthenticateUserController";

const authenticateRouter = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRouter.post("/sessions", authenticateUserController.handle);

export { authenticateRouter };
