import { useDispatch, useSelector } from "react-redux";
import { MainRoutes } from "./routes/MainRoutes"
import { useEffect } from "react";
import { startLoadingNotes } from "./store/todoThunks";

import { store } from './store/store';
import { startUserPersistance, startUserPersistanceWithProvider } from "./store/loginThunks";
import { getStorageUserData } from "./sesionStorage/auth/auth";

export const TodoApp = () => {

    const { isAuthenticating } = useSelector((state) => state.auth);
    const { isLoading } = useSelector((state) => state.todo);

    const dispatch = useDispatch();

    useEffect(() => {
        const storageUserData = getStorageUserData();
        if (storageUserData) {
            const { inputEmail, inputPassword, authProvider } = storageUserData;
            // dispatch(startUserPersistance({ inputEmail, inputPassword }));
            if( authProvider ){
                dispatch(startUserPersistanceWithProvider({ authProvider }));
            }

            if( inputEmail && inputPassword ){
                dispatch(startUserPersistance({ inputEmail, inputPassword }));
            }
        }

    }, []);

    useEffect(() => {
        const userID = store.getState().auth.user.uid || '';
        dispatch(startLoadingNotes(userID));
    }, [isAuthenticating]);

    return (
        <>
            {
                isAuthenticating ?
                    <div className="box--loading"><span>Procesando datos...</span></div>
                    :
                    ''
            }
            {
                isLoading ?
                    <div className="box--loading"><span>Procesando datos de todo...</span></div>
                    :
                    ''
            }
            <MainRoutes />
        </>
    )
}