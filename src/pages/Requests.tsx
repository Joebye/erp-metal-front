import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useSelectorAllEmails } from "../hooks/hooks";
import { emailService } from "../config/service-config";
import QuotesCard from "../cards/QuotesCard";
import { useRef, useState } from "react";
import Product from "../model/Product";

const Requests: React.FC = () => {
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


       const [openDetails, setFlDetails] = useState(false);
       const products = useRef<Product[]>();
       const curCustomerEmail = useRef<string>('');
        const rows = useSelectorAllEmails();
        
        const columns: GridColDef[] = [
           
            {
                field: "id", headerName: 'ID', flex: 0.3, headerClassName: 'data-grid-header',
                align: 'center', headerAlign: 'center'
            },
            {
                field: "customerName", headerName: 'Customer Name', flex: 0.5, headerClassName: 'data-grid-header',
                align: 'center', headerAlign: 'center'
            },
            {
                field: "customerEmailAddress", headerName: 'Customer Email Address', flex: 0.5, headerClassName: 'data-grid-header',
                align: 'center', headerAlign: 'center'
            },
            {
                field: "phoneNum", headerName: 'Phone Number', flex: 0.5, headerClassName: 'data-grid-header',
                align: 'center', headerAlign: 'center', type: "number"
            },
            {
                field: "dateTime", headerName: 'Application date', flex: 0.5, headerClassName: 'data-grid-header',
                align: 'center', headerAlign: 'center'
            },
            {
                field: "subject", headerName: 'Subject', flex: 0.5, headerClassName: 'data-grid-header',
                align: 'center', headerAlign: 'center'
            },
            {
                field: "curUserEmail", headerName: 'Account Owner', flex: 0.5, headerClassName: 'data-grid-header',
                align: 'center', headerAlign: 'center'
            },
            {
                field: 'actions', headerName: 'Actions', flex: 0.6, headerClassName: 'data-grid-header',
                align: 'center', headerAlign: 'center', renderCell: params => {
                    const onClickFn = () => {
                        const idStr = params.id.toString();
                       generateResponseFQ(idStr);
                       setFlDetails(true);
                       curCustomerEmail.current = params.row.curUserEmail;
                       
                       
                        
                    };
            
                    return (
                        params.row.subject == "request for quote" ? 
                        <Button sx={{fontSize: '10px'}} variant="contained" color="primary" onClick={onClickFn}>
                            Generate RFQ
                        </Button> : null
                    );
                 },
                }
        ]
            
        async function generateResponseFQ(id: string) {
            try {
                const res = await emailService.generaeteRFQ(id);
                products.current = res;
                } catch (error){
                throw error
            }
        }


        function sendToClientFn() {
            console.log(products.current);
            localStorage.setItem(`dataPayload${curCustomerEmail.current}`, JSON.stringify(products.current));
            
        }
    

    return <Box sx={{ height: '90vh', margin: '15px' }}>
    <DataGrid 
    columns={columns} rows={rows}/>
     <Modal
            open={openDetails}
            onClose={() => setFlDetails(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <QuotesCard products={products.current!}
                actionFn={sendToClientFn}/>
            </Box>
        </Modal>
    </Box>
    
    }
   
 

export default Requests;