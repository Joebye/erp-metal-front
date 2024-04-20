import Email from "../../model/Email";

export default interface EmailService {
    addEmail(email: Email): Promise<Email|string>;
}