import { Navigate, Route, Routes } from "react-router-dom"
import { TodoPage } from "../views/pages/PrivateSite/TodoPage"
import { AboutMePage } from "../views/pages/PrivateSite/AboutMePage"
import { LoginPage } from "../views/pages/Auth/LoginPage"
import { RegisterPage } from "../views/pages/Auth/RegisterPage"
import { SiteLayout } from "../layout/SiteLayout";
import { AuthLayout } from "../layout/AuthLayout";


export const PrivateRoutes = () => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<SiteLayout/>}>
                    <Route path={'/todo'} element={<TodoPage/>}/>
                    <Route path={'/about-me'} element={<AboutMePage/>}/>
                    <Route path={'/*'} element={<Navigate to={'/todo'}/>}/>
                </Route>
            </Routes>
        </>
    )
}

export const AuthRoutes = () => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<AuthLayout/>}>
                    <Route path={'login'} element={<LoginPage/>}/>
                    <Route path={'register'} element={<RegisterPage/>}/>
                    <Route path={'/*'} element={<Navigate to={'/auth/login'}/>}/>
                </Route>
            </Routes>
        </>
    )
}