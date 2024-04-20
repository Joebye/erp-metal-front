import {useDispatch} from 'react-redux';
import { Button } from '@mui/material';
import { userActions } from '../redux/slices/userSlice';
const SignOut: React.FC = () => {
    const dispatch = useDispatch();
    
    return  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}> 
    <Button variant="contained" onClick={() => dispatch(userActions.reset())}>confirm sign out</Button>
   </div>
}
 
 export default SignOut;