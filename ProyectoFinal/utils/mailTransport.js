import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "facundosarabia15@gmail.com",
    pass: "facundocoder",
  },
});

export default transporter