import { FirebaseAuth } from "../firebase/config";
import { createAccountNameMailPassword, getUserLoginPersistance, loginWithEmailPassword, loginWithGmail, userLogout } from "../firebase/loginProvider";
import { clearStorageUserData, createStorageUserData } from "../sesionStorage/auth/auth";
import { setAuthenticathing, login, logout } from "./slices/authSlice";
import { clearAllTodo } from "./slices/todoSlice";
import { startLoadingNotes } from "./todoThunks";


export const getTodoAfterPersistance =(dispatch,getState)=>{
    const userID = getState().auth.user.uid;
    dispatch(startLoadingNotes( userID ));
}

export const startUserPersistanceWithProvider = ({ authProvider })=>{
    return async( dispatch, getState )=>{
        FirebaseAuth.onAuthStateChanged((user) => {
            const { uid, displayName, email, photoURL } = user;
            dispatch( login({ uid, displayName, email, photoURL }) );

            getTodoAfterPersistance(dispatch,getState);

        });
    }
}

export const startUserPersistance = ({ inputEmail, inputPassword, authProvider })=>{
    return async( dispatch, getState )=>{
        const response = await getUserLoginPersistance({ inputEmail, inputPassword, authProvider });

        if(!response.ok){
            const errors = response.error;
            dispatch( logout( JSON.stringify(errors) ) );
        }

        if(response.ok){
            const userData = response.user?.user;
            const { uid, displayName, email, photoURL } = userData;
            dispatch( login({ uid, displayName, email, photoURL }) );

            getTodoAfterPersistance(dispatch,getState);
            
        }

    }
}


export const startLoginWithGmail = ()=>{

    return async( dispatch, getState )=>{

        dispatch(setAuthenticathing());

        const response = await loginWithGmail();

        if(!response.ok){
            const errors = response.error;
            dispatch( logout( JSON.stringify(errors) ) );
        }

        if(response.ok){
            const userData = response.user?.user;
            // console.log('USER DATA:', userData);
            const { uid, displayName, email, photoURL, providerData } = userData;

            const providerId = providerData[0].providerId || '';
            // console.log('PROVIDER ID;', providerId);

            dispatch( login({ uid, displayName, email, photoURL, providerId }) );

            if(providerId){
                createStorageUserData({ providerId })
            }

        }

    }

}

export const startLoginWithEmailPassword = ( { inputEmail, inputPassword } )=>{
    
    return async( dispatch )=>{

        dispatch(setAuthenticathing());

        const response = await loginWithEmailPassword({ inputEmail, inputPassword });

        if(!response.ok){
            const errors = response.error;
            dispatch( logout( JSON.stringify(errors) ) );
        }

        if(response.ok){
            const userData = response.user?.user;
            const { uid, displayName, email, photoURL } = userData;
            dispatch( login({ uid, displayName, email, photoURL }) );

            createStorageUserData({ inputEmail, inputPassword });

        }

    }

}

export const startCreateAccountNameMailPassword = ( { inputName, inputEmail, inputPassword } )=>{
    return async( dispatch )=>{

       dispatch(setAuthenticathing());

        const response = await createAccountNameMailPassword({ inputName, inputEmail, inputPassword });

        if(!response.ok){
            const errors = response.error;
            dispatch(logout(errors))
        }

        if(response.ok){
            const userData = response.user?.user;
            const { uid, displayName, email, photoURL } = userData;
            dispatch(login({ uid, displayName, email, photoURL }));
            createStorageUserData({ inputEmail, inputPassword })
        }

    }

}   


export const startLogout = ()=>{

    return async(dispatch)=>{
        await userLogout();
        dispatch(logout());
        dispatch(clearAllTodo());
        clearStorageUserData();
    }

}