import { Box, Card, CardContent, Typography } from "@mui/material"
import { useSelectorEmailsByCurUser } from "../hooks/hooks";
import Email from "../model/Email";
import { useSelectorUser } from "../redux/store";
import Product from "../model/Product";

const ListEmails: React.FC = () => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
    const emails: Email[] = useSelectorEmailsByCurUser();
    const user = useSelectorUser()
  
  
  const data = localStorage.getItem(`dataPayload${user?.email}`)
  if (data) {
    const dataObj = JSON.parse(data) as Product[];
    return (<Card sx={{ minWidth: 275 }}>
      <CardContent> 
    {dataObj.map(product => (
        <div key={product.id}>
        <Typography fontSize={15} ml={7}>
                Product: {product.nameProduct}
        </Typography>
        <Typography fontSize={15}ml={7}>
                Price per unit: {product.cost}
        </Typography>
        <Typography fontSize={15}ml={7}>
                Quantity offer: {product.quantityStock}
        </Typography>
        <Typography fontSize={15} ml={7}>
                Total price: {product.inventoryCost}
        </Typography>
        <Typography fontSize={15} ml={7}>
                Delivery date: {product.dueDate}
        </Typography>
        <Typography fontSize={15} ml={7}>
                Shipping restrictions: {product.shippingRestrictions}
        </Typography>
        <hr/>
    </div>
    ))}
      </CardContent>
      </Card>
  );


  } else {
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

  }



export default ListEmails;