import {
  Testimonials,
  TestimonialsRepositoryInterface,
} from "../core/domain/testimonials";
import { database } from "../db";

class TestimonialsRepository implements TestimonialsRepositoryInterface {
  getTestimonials = async () => {
    try {
      const data = await database.query<Testimonials>(
        "SELECT * FROM testimonials"
      );

      return data.rows;
    } catch (error) {
      throw error;
    }
  };

  createTestimonial = async (testimonial: Testimonials) => {
    try {
      const data = await database.query<Testimonials>(
        "INSERT INTO testimonials (name, image_url, occupation, title, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
          testimonial.name,
          testimonial.image_url,
          testimonial.occupation,
          testimonial.title,
          testimonial.description,
        ]
      );

      return data.rows[0];
    } catch (error) {
      throw error;
    }
  };
}

export const testimonialsRepository = new TestimonialsRepository();
