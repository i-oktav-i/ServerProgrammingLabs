import { Request, Response } from "express";

import navLinks from "../links.json";
import portfolioItems from "../portfolio.json";
import { Testimonials } from "../core/domain/testimonials";

export const pagesMiddleware = async (req: Request, res: Response) => {
  const testimonials: Testimonials[] = await fetch(
    `http://${req.headers.host}/api/testimonials/`
  ).then((res) => res.json());

  res.render(req.url === "/" ? "home" : req.params.page, {
    navLinks: navLinks.map((link) => ({
      ...link,
      active: req.url === link.url,
    })),
    portfolioItems,
    testimonials,
  });
};
