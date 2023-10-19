import { Link } from "react-router-dom"
import { startLogout } from "../../store/loginThunks"
import { useDispatch } from "react-redux"

export const NavBar = () => {

    const dispatch = useDispatch();

    const handleLogout = ()=>{
        dispatch( startLogout() );
    }
    
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to={'todo'}>Todo List</Link>
                    </li>
                    <li>
                        <Link to={'about-me'}>About me</Link>
                    </li>
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </nav>
        </>
    )
}