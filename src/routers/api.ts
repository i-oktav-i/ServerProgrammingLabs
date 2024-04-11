import { Router } from "express";
import { contactFormMiddleware } from "../middlewares";
import { testimonialsController } from "../controllers";
import { superheroesController } from "../controllers/superheroes";
import { colorController } from "../controllers/color";
import { authenticate } from "./auth";
import { checkPermissionMiddleware } from "../middlewares/checkPermissionMiddleware";

export const apiRouter = Router();

apiRouter.post("/contactForm", contactFormMiddleware);

apiRouter.get("/testimonials", testimonialsController.getTestimonials);
apiRouter.post("/testimonials", testimonialsController.createTestimonial);

apiRouter.get("/superheroes", superheroesController.getAll);
apiRouter.get("/superheroes/:id", superheroesController.get);
apiRouter.post("/superheroes", superheroesController.create);
apiRouter.put(
  "/superheroes",
  authenticate,
  checkPermissionMiddleware,
  superheroesController.update
);
apiRouter.delete(
  "/superheroes/:id",
  authenticate,
  checkPermissionMiddleware,
  superheroesController.delete
);

apiRouter.get("/color", colorController.getAll);
apiRouter.get("/color/:id", colorController.get);
apiRouter.post("/color", colorController.create);
apiRouter.put(
  "/color",
  authenticate,
  checkPermissionMiddleware,
  colorController.update
);
apiRouter.delete(
  "/color/:id",
  authenticate,
  checkPermissionMiddleware,
  colorController.delete
);
