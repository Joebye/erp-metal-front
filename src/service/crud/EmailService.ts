import { Observable } from "rxjs";
import Email from "../../model/Email";

export default interface EmailService {
    addEmail(email: Email): Promise<Email|string>;
    getEmailsAllOrByCurUser(curUserEmail?: string): Observable<Email[]|string>;
    generaeteRFQ(id: string): Promise<Email|string>;


}