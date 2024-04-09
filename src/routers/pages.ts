import { Router } from "express";
import navLinks from "../links.json";
import { pagesMiddleware } from "../middlewares";

export const pagesRouter = Router();

const pagesRoutes = navLinks
  .map((link) => link.url.replace("/", ""))
  .filter(Boolean)
  .join("|");

pagesRouter.get(`/:page(${pagesRoutes}|)`, pagesMiddleware);
