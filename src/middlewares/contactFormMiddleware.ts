import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const csvPath = path.resolve(__dirname, "../../contactFrom.csv");

export const contactFormMiddleware = async (req: Request, res: Response) => {
  const isEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const {
    first_name,
    last_name = "",
    email,
    phone = "",
    select_service = "",
    select_price = "",
    comments,
  } = req.body;

  if (!first_name || !email || !isEmail(email) || !comments) {
    res.render("contactFormError", {
      layout: false,
      errors: [
        !first_name && "Attention! You must enter your name.",
        !email && "Attention! Please enter a valid email address.",
        email &&
          !isEmail(email) &&
          "Attention! You have enter an invalid e-mail address, try again.",
        !comments && "Attention! Please enter your message.",
      ].filter(Boolean),
    });
  } else {
    if (!fs.existsSync(csvPath)) {
      fs.writeFileSync(
        csvPath,
        "First Name;Last Name;Email;Phone;Service;Price;Comments\n"
      );
    }

    fs.appendFileSync(
      csvPath,
      `${first_name};${last_name};${email};${phone};${select_service};${select_price};${comments}\n`
    );

    res.render("contactFormSuccess", { layout: false, name: first_name });
  }
};
