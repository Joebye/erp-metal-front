import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useSelectorAllEmails } from "../hooks/hooks";
import QuotesCard from "../cards/QuotesCard";
import { useState } from "react";


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
        const rows = useSelectorAllEmails();
        const [idEm, setIdEm] = useState<string>('');
        const [curUserRfq, setCurUserRfq] = useState<string>();
        
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
                        setIdEm(idStr);
                        setCurUserRfq(params.row.curUserEmail);
                        setFlDetails(true);
                      
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
                <QuotesCard
                    id={idEm} curUser={curUserRfq!}/>
            </Box>
        </Modal>
    </Box>
    
    }
   
 

export default Requests;