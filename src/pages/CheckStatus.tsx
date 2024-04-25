import { Card, CardContent, Typography } from "@mui/material"
import { useSelectorEmailsByCurUser } from "../hooks/hooks";
import Email from "../model/Email";


const ListEmails: React.FC = () => {
    const emails: Email[] = useSelectorEmailsByCurUser();
    console.log(emails);
    
    return (
        <div>
          {emails.map((item, index) => (
            <Card key={index} sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Your request Id:
                </Typography>
                <Typography variant="h6" component="div">
                  {item.id}
                </Typography>

                <Typography color="text.secondary">
                  Customer Name:
                </Typography>
                <Typography variant="h6" component="div">
                  {item.customerName}
                </Typography>

                <Typography color="text.secondary">
                  Phone number:
                </Typography>
                <Typography variant="h6" component="div">
                  {item.phoneNum}
                </Typography>
                
                <Typography color="text.secondary">
                  Subject:
                </Typography>
                <Typography variant="h6" component="div">
                  {item.subject}
                </Typography>

                <Typography color="text.secondary">
                  Requested date:
                </Typography>
                <Typography variant="h6" component="div">
                  {item.dateTime}
                </Typography>

                <Typography color="text.secondary">
                  Status:
                </Typography>
                <Typography variant="h6" component="div">
                  {item.status}
                </Typography>

             </CardContent>
            </Card>
          ))}
        </div>
      );
}

export default ListEmails;