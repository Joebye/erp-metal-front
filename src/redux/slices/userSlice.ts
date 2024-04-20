import User from "../../model/User";
import {createSlice} from '@reduxjs/toolkit';
import authConfig from '../../config/auth-config.json';

const {localStorageKey} = authConfig;

function getUser(): User | undefined {
    const userJson = localStorage.getItem(localStorageKey);
   let res: User | undefined;
    if(userJson) {
         res = JSON.parse(userJson);
    }
    return res;

}


const initialState: {user: User} = {
    user: getUser()!
    
}
    const userSlice = createSlice({
        initialState,
        name: 'userState',
        reducers: {
            set: (state, data) => {
                localStorage.setItem(localStorageKey, JSON.stringify(data.payload))
                state.user = data.payload;
            },
            reset: (state) => {
                state.user = undefined!;
                localStorage.removeItem(localStorageKey)
            }
        }
    });
    export const userActions = userSlice.actions;
    export const userReducer = userSlice.reducer;


