import { Router } from "express";
import { contactFormMiddleware } from "../middlewares";
import { testimonialsController } from "../controllers";

export const apiRouter = Router();

apiRouter.post("/contactForm", contactFormMiddleware);

apiRouter.get("/testimonials", testimonialsController.getTestimonials);
apiRouter.post("/testimonials", testimonialsController.createTestimonial);
