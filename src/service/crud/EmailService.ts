import { Observable } from "rxjs";
import Email from "../../model/Email";
import Product from "../../model/Product";

export default interface EmailService {
    addEmail(email: Email): Promise<Email|string>;
    getEmailsAllOrByCurUser(curUserEmail?: string): Observable<Email[]|string>;
    generaeteRFQ(id: string): Promise<Product[]>;


}