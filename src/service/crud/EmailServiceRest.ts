import Email from "../../model/Email";
import EmailService from "./EmailService";
const SERVER_NOT_AVILABLE = 'Server is unavailable, repeat later on'
export default class UserServiceRest implements EmailService {
    private urlServise: string;
    constructor(baseUrl: string) {
    this.urlServise = `http://${baseUrl}`
}
    async addEmail(email: Email): Promise<Email|string> {
        try {
            let res:Email|string;
            const response = await fetch(`${this.urlServise}/addemail`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(email),
            });
            res = await response.json();
            return res;
        } catch {
            throw prompt(SERVER_NOT_AVILABLE);
        }
    }
    

}