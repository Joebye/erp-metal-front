import EmailService from "../service/crud/EmailService";
import EmailServiceRest from "../service/crud/EmailServiceRest";

export const emailService: EmailService = new EmailServiceRest('localhost:3500')