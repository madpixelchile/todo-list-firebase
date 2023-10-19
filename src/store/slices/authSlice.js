

import { createSlice } from '@reduxjs/toolkit'; 

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticating: false,
        ok: false,
        errorMsg: '',
        providerId: '',
        user: {
            isLogged: null,
            uid: '',
            userName: '',
            userEmail: '',
            userIMG: '',
        }
    },
    reducers: {
        setAuthenticathing: ( state ) => {
            state.isAuthenticating = true;
        },
        login: ( state, { payload } ) => {
            state.isAuthenticating = false;
            state.ok = true;
            state.errorMsg = '';
            state.providerId = payload?.providerId;

            state.user.isLogged = true;
            state.user.uid = payload.uid;
            state.user.userName = payload?.displayName;
            state.user.userEmail = payload?.email;
            state.user.userIMG = payload?.photoURL;
            
        },
        logout: ( state, action ) => {
            state.isAuthenticating = false;
            state.ok = false;
            state.errorMsg = action.payload;
            state.providerId = '';

            state.user.isLogged = false;
            state.user.uid = '';
            state.user.userName = '';
            state.user.userEmail = '';
            state.user.userIMG = '';
        }
    }
});

export const { login, logout, setAuthenticathing } = authSlice.actions;
