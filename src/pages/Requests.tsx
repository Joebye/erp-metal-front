import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useSelectorAllEmails } from "../hooks/hooks";
import { emailService } from "../config/service-config";

const Requests: React.FC = () => {
        
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
                field: "status", headerName: 'Status', flex: 0.5, headerClassName: 'data-grid-header',
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
                        console.log(idStr);
                        
                        generateResponseFQ(idStr);
                        
                        console.log(params.row);
                    };
            
                    return (
                        params.row.subject == "request for quote" && params.row.status == "pending" ? 
                        <Button sx={{fontSize: '10px'}} variant="contained" color="primary" onClick={onClickFn}>
                            Generate response
                        </Button> : null
                    );
                 },
                }
        ]
            
        async function generateResponseFQ(id: string) {
            try {
                const res = await emailService.generaeteRFQ(id);
                console.log(res);
                
                } catch (error){
                throw error
            }
        }
    

    return <Box sx={{ height: '90vh', margin: '15px' }}>
    <DataGrid 
    columns={columns} rows={rows}/>
    </Box>
    
    }
   
 

export default Requests;