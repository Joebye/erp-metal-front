import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from "./slices/userSlice";
import { useSelector } from "react-redux";
import User from "../model/User";

export const store = configureStore({
    reducer: {
        userState: userReducer,
    }
});

export function useSelectorUser() {
    return useSelector<any, User>(state => state.userState.user);
}
