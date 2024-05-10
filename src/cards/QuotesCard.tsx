import { Button, Card, CardActions, CardContent, CircularProgress, Typography } from "@mui/material"
import Product from "../model/Product"
import { useEffect, useState } from "react";
import { emailService } from "../config/service-config";


type Props = {
     id: string;
     curUser: string;
}
const QuotesCard: React.FC<Props> = ({id, curUser}) => {
    const [prods, setProds] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProds = async () => {
            try {
                const res = await emailService.generaeteRFQ(id);
                setProds(res);
            } catch(err) {
                console.log(err);
                
            }
        }
        fetchProds(); 
   }, [])
    
   function submitFn (prods: any) {
    localStorage.setItem(`dataPayload${curUser}`, JSON.stringify(prods));
   }
    

      return (<Card sx={{ minWidth: 275 }}>
          <CardContent> 
        {prods.map(product => (
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
          <CardActions sx={{ justifyContent: 'center',marginTop:'-3vh'}}>
            <Button size="small"onClick={() => submitFn(prods)}>Send to Client</Button>
           </CardActions>
        </Card>
      );
    }
    export default QuotesCard;



