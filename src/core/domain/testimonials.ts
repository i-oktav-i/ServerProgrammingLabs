import { Request, Response } from "express";

export type Testimonials = {
  id: number;
  name: string;
  image_url: string;
  occupation: string;
  title: string;
  description: string;
};

export interface TestimonialsControllerInterface {
  getTestimonials: (req: Request, res: Response) => void;
  createTestimonial: (req: Request, res: Response) => void;
}

export type TestimonialsRepositoryInterface = {
  getTestimonials: () => PromiseLike<Testimonials[]>;
  createTestimonial: (testimonial: Testimonials) => PromiseLike<Testimonials>;
};
