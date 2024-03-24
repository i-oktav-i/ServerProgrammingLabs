import { Request, Response } from "express";

import navLinks from "../links.json";
import portfolioItems from "../portfolio.json";

export const pagesMiddleware = async (req: Request, res: Response) => {
  res.render(req.url === "/" ? "home" : req.params.page, {
    navLinks: navLinks.map((link) => ({
      ...link,
      active: req.url === link.url,
    })),
    portfolioItems,
  });
};
