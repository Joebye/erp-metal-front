import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import Product from "../model/Product"

type Props = {
    products: Product[];
    actionFn: (products: Product[]) => void
}
const QuotesCard: React.FC<Props> = ({products, actionFn}) => {
    if (!products) {
        return null;
    }

      return (<Card sx={{ minWidth: 275 }}>
          <CardContent> 
        {products.map(product => (
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
          <CardActions>
            <Button size="small"onClick={() => actionFn(products)}>Send to Client</Button>
           </CardActions>
        </Card>
      );
    }
    export default QuotesCard;