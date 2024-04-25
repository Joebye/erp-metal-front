import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Email from "../model/Email";
import { useState } from "react";
import { emailService } from "../config/service-config";
import emailConfig from '../config/email-config.json'
import moment from "moment";
import { useSelectorUser } from "../redux/store";

const SendEmail: React.FC = () => {
    const {subjectType} = emailConfig;
    const [email, setEmail] = useState<Email|undefined>();
    const curUser = useSelectorUser();
    

    async function onSubmitFn(event: any) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const inputedCustomerName: string = data.get("customerName") as string
        const inputedCustomerEmailAddress: string = data.get("customerEmailAddress") as string
        const inputedCustomerPhoneNum: string = data.get("customerPhoneNum") as string
        const choosenSubject: string = data.get("subject") as string
        const inputedEmailText: string = data.get('emailText') as string
        const dateTimeNow: string = moment().format("DD MMMM YYYY HH:mm");
        const curUserEmail = curUser?.email;

        let newEmail: Email = {
            customerName: inputedCustomerName,
            customerEmailAddress: inputedCustomerEmailAddress,
            phoneNum: inputedCustomerPhoneNum,
            subject: choosenSubject,
            text: inputedEmailText,
            dateTime: dateTimeNow,
            curUserEmail: curUserEmail

        }

        setEmail(newEmail);
        console.log(newEmail);
        await emailService.addEmail(newEmail);
        event.target.reset();
      }

    function onResetFn() {
        setEmail(email);
    }

    return (<form
        onSubmit={onSubmitFn}
        onReset={onResetFn}
        style={{ display: "flex", flexDirection: 'row' }}>
        <Box 
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "25vw",
                gap: "15px",
                mt: '1vh',
                ml: '4vw'
            }}
        >
            <TextField
                name="customerName"
                size="small"
                type="text"
                required
                fullWidth
                label="Your Name"
                inputProps={{ maxLength: 32 }}
                helperText={"Enter your preffered name"}
            />

            <TextField
                name="customerEmailAddress"
                size="small"
                type="email"
                required
                fullWidth
                label="Your Email"
                inputProps={{ maxLength: 32 }}
                helperText={"Enter your email address"}
            />

            <TextField
                name="customerPhoneNum"
                type="number"
                size="small"
                required
                fullWidth
                label="Your Phone Number"
                onInput={(e: any) => { e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10) }}
                helperText={"Enter your phone number upto to 10 numbers"}
            />

            <FormControl fullWidth required>
                <InputLabel>Select Subject</InputLabel>
                <Select name="subject" label="Select Subject"
                    value={email?.subject}>
                    {subjectType.map(sub => <MenuItem value={sub} key={sub}>{sub}</MenuItem>)}
                </Select>
            </FormControl>

        </Box>
        <Box sx={{

            width: "50vw",
            gap: "15px",
            mt: '1vh',
            ml: '4vw',
        }}>
            <TextField
                name="emailText"
                size="small"
                type="text"
                required
                fullWidth
                multiline
                rows={13}
                label="Type your request here...."
            />
            <Button
                sx={{ mt: '5vh' }}
                type="submit"
                size="medium"
                variant="contained"
                color="primary"

            >
                Submit
            </Button>
        </Box>

    </form>

    )
}

export default SendEmail;