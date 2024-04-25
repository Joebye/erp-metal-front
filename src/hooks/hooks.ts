import { useEffect, useState } from "react";
import {emailService} from "../config/service-config";
import { useSelectorUser } from "../redux/store";
import Email from "../model/Email";
import { Subscription } from "rxjs";


export function useSelectorEmailsByCurUser() {
const [emailsByCurUser, setEmailsByCurUser] = useState<Email[]>([])
const curUser = useSelectorUser();
const curUserEmail = curUser!.email;
useEffect(() => {
    const subscription: Subscription = emailService.getEmailsAllOrByCurUser(curUserEmail).
    subscribe({
        next(emailsArray: Email [] | string) {
            let errorMessage: string = '';
            if (typeof emailsArray === 'string') {
                errorMessage = emailsArray
            } else {
                setEmailsByCurUser(emailsArray);
            }
        }
    });
   return () => subscription.unsubscribe();
}, []);
return emailsByCurUser;

}



export function useSelectorAllEmails() {
    const [emailsAll, setEmailsAll] = useState<Email[]>([])
    useEffect(() => {
        const subscription: Subscription = emailService.getEmailsAllOrByCurUser().
        subscribe({
            next(emailsArray: Email [] | string) {
                let errorMessage: string = '';
                if (typeof emailsArray === 'string') {
                    errorMessage = emailsArray
                } else {
                    setEmailsAll(emailsArray);
                }
            }
        });
       return () => subscription.unsubscribe();
    }, []);
    return emailsAll;
    
    }