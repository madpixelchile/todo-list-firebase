import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { useForms } from "../../../hooks/useForms";
import { startCreateAccountNameMailPassword } from "../../../store/loginThunks";

const initialValues = {
    inputName: '',
    inputEmail: '',
    inputPassword: ''
}

export const RegisterPage = () => {

    const { inputValue, handleChange, setInputValue } = useForms(initialValues);

    const { inputName, inputEmail, inputPassword } = inputValue;

    const dispatch = useDispatch();

    const { errorMsg } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        if( !inputName || !inputEmail || !inputPassword ) return;

        dispatch(startCreateAccountNameMailPassword(inputValue));

        setInputValue({
            inputName: '',
            inputEmail: '',
            inputPassword: ''
        });

    }

    return (
        <>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type={'text'}
                        name={'inputName'}
                        placeholder={'Ingresa tu nombre'}
                        onChange={handleChange}
                        value={inputName}
                        autoComplete="off"
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type={'email'}
                        name={'inputEmail'}
                        placeholder={'Ingresa tu email'}
                        onChange={handleChange}
                        value={inputEmail}
                        autoComplete="on"
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type={'password'}
                        name={'inputPassword'}
                        placeholder={'Ingresa tu password'}
                        onChange={handleChange}
                        value={inputPassword}
                        autoComplete="off"
                    />
                </div>


                <button>Registro</button>

                <p>Si no tienes cuenta regístrate <Link to={'/auth/register'}>aquí</Link></p>
            </form>
            {
                errorMsg ?
                <p className="text--error">{ errorMsg }</p>
                :
                ''
            }
        </>
    )
}