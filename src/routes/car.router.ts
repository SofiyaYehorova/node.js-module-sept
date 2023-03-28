import { Router } from "express";

import { carController } from "../controllers";
import {
  authMiddleware,
  carMiddleware,
  commonMiddleware,
} from "../middlewares";
import { CarValidator } from "../validators";

const router = Router();

router.post(
  "/:carId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(CarValidator.createCar),
  carController.create
);

router.get(
  "/:carId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("carId"),
  carMiddleware.getByIdOrThrow,
  carController.getById
);

router.put(
  "/:carId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("carId"),
  commonMiddleware.isBodyValid(CarValidator.updateCar),
  carMiddleware.getByIdOrThrow,
  carController.getById
);

router.delete(
  "/carId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("carId"),
  carMiddleware.getByIdOrThrow,
  carController.delete
);

export const carRouter = router;
