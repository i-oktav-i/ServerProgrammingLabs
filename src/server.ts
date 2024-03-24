import bodyParser from "body-parser";
import express from "express";
import { create } from "express-handlebars";
import path from "path";

import navLinks from "./links.json";
import { contactFormMiddleware, pagesMiddleware } from "./middlewares";

const app = express();
const apiRouter = express.Router();

const hbs = create({
  partialsDir: [path.resolve(__dirname, "./views/partials/")],
});

const pagesRoutes = navLinks
  .map((link) => link.url.replace("/", ""))
  .filter(Boolean)
  .join("|");

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);
app.get(`/:page(${pagesRoutes}|)`, pagesMiddleware);
app.use(express.static("public/"));

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

apiRouter.post("/contactForm", contactFormMiddleware);
