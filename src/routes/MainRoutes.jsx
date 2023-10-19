import { Routes, Route, Navigate } from "react-router-dom"
import { AuthRoutes, PrivateRoutes } from "./AllRoutes"
import { useSelector } from "react-redux";


export const MainRoutes = () => {

    const { user } = useSelector((state)=>state.auth);

    const logged = user.isLogged;

    return (
        <>
            <Routes>
                {
                    logged ?
                        <Route path={'/*'} element={<PrivateRoutes/>}/>
                    :
                        <Route path={'/auth/*'} element={<AuthRoutes/>}/>
                }
                <Route path={'/*'} element={<Navigate to={'/auth/login'} />} />  
            </Routes>
        </>
    )
}