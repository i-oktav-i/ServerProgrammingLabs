import { Request, Response } from "express";
import {
  Testimonials,
  TestimonialsControllerInterface,
  TestimonialsRepositoryInterface,
} from "../core/domain/testimonials";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { testimonialsRepository } from "../repositories";

class TestimonialsController implements TestimonialsControllerInterface {
  constructor(
    private testimonialsRepository: TestimonialsRepositoryInterface
  ) {}

  getTestimonials = async (
    _req: Request<ParamsDictionary, Testimonials[], Testimonials[], ParsedQs>,
    res: Response
  ) => {
    try {
      const testimonials = await this.testimonialsRepository.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  createTestimonial = async (
    req: Request<ParamsDictionary, any, Testimonials, ParsedQs>,
    res: Response
  ) => {
    try {
      const data = await this.testimonialsRepository.createTestimonial(
        req.body
      );
      res.status(201).json(data);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

export const testimonialsController = new TestimonialsController(
  testimonialsRepository
);
