import Email from "../../model/Email";
import EmailService from "./EmailService";
import { Subscriber, Observable } from "rxjs";
const SERVER_NOT_AVAILABLE = 'Server is unavailable, repeat later on'

export default class UserServiceRest implements EmailService {
    private urlServise: string;
    private observable: Observable<Email[] | string> | undefined;
    private subscriber: Subscriber<Email[] | string> | undefined;
    constructor(baseUrl: string) {
    this.urlServise = `http://${baseUrl}`
}

    async generaeteRFQ(id: string): Promise<string> {
        try {
            const response = await fetch(`${this.urlServise}/requests/${id}`);
            
            
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to generate RFQ: ' + response.statusText);
            }
        } catch (error) {
            console.error('Error generating RFQ:', error);
            throw SERVER_NOT_AVAILABLE;
        }
    }


    async addEmail(email: Email): Promise<Email|string> {
        try {
        const response = await fetch(`${this.urlServise}/addemail`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(email),
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to generate RFQ: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error generating RFQ:', error);
        throw SERVER_NOT_AVAILABLE;
    }
}


getEmailsAllOrByCurUser(curUserEmail?:string): Observable<string | Email[]> {
        this.observable = new Observable<Email[] | string> (subscriber => {
            this.subscriber = subscriber;
            if (curUserEmail != undefined) {
                this.subscriberNextByUser(curUserEmail);
            } else {
                this.subscriberNextAll();
            }
      });
        return this.observable;
    }
    private subscriberNextByUser(curUserEmail?: string): void {
        fetchEmails(`${this.urlServise}/checkstatus/${curUserEmail}`).then(emails => {
            this.subscriber?.next(emails);
        }).catch(error => this.subscriber?.next(error))
    }
    private subscriberNextAll(): void {
        fetchEmails(`${this.urlServise}/requests`).then(emails => {
            this.subscriber?.next(emails);
        }).catch(error => this.subscriber?.next(error))
    }

   }

    async function fetchEmails(url: string): Promise<Email[] | string> {
        const response = await fetch(url, {});
        return response.json();

        
    }

