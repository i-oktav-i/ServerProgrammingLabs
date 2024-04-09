import bodyParser from "body-parser";
import express from "express";
import { create } from "express-handlebars";
import path from "path";

import { apiRouter, pagesRouter } from "./routers";

const app = express();

const viewsDir = path.join(__dirname, "..", "public", "views");

const hbs = create({
  partialsDir: [path.join(viewsDir, "partials")],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", viewsDir);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);
app.use(`/`, pagesRouter);
app.use(express.static("public/"));

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
