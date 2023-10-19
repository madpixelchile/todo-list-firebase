import { useSelector } from "react-redux";
import { NavBar } from "../NavBar/NavBar";
export const Header = () => {

    const { user } = useSelector(( state )=> state.auth);

    return (
        <>
            <header>
                <p>TODO APP{ user.userName ? ', Hola ' + user.userName : '' }</p>
                <NavBar/>
            </header>
        </>
    )
}