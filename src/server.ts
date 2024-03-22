import express from "express";
import { create } from "express-handlebars";
import path from "path";

import navLinks from "./links.json";

const app = express();
const hbs = create({
  partialsDir: [path.resolve(__dirname, "./views/partials/")],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

const template = navLinks
  .map((link) => link.url.replace("/", ""))
  .filter(Boolean)
  .join("|");

app.get(`/:page(${template}|)`, (req, res) => {
  res.render(req.url === "/" ? "home" : req.params.page, {
    navLinks: navLinks.map((link) => ({
      ...link,
      active: req.url === link.url,
    })),
  });
});

app.use(express.static("public/"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
