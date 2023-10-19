import { Link } from "react-router-dom";
import { useForms } from "../../../hooks/useForms"
import { useDispatch, useSelector } from "react-redux";
import { startLoginWithEmailPassword, startLoginWithGmail } from "../../../store/loginThunks";

import { PageHeadings } from '../../../components/PageHeadings/PageHeadings';


const initialValues = {
    inputEmail: '',
    inputPassword: ''
}
export const LoginPage = () => {

    const { inputValue, handleChange, setInputValue } = useForms(initialValues);

    const { inputEmail, inputPassword } = inputValue;

    const dispatch = useDispatch();

    const { errorMsg } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!inputEmail || !inputPassword) return;

        dispatch(startLoginWithEmailPassword(inputValue));

        setInputValue({
            inputEmail: '',
            inputPassword: ''
        });

    }

    const handleLoginGoogle = () => {
        // console.log('login with google');
        dispatch(startLoginWithGmail());
    }

    return (
        <>
            <PageHeadings className="text-white">Login</PageHeadings>

            <div className="block rounded-lg bg-white p-6 shadow-lg">

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col flex-center items-center">
                        <div>
                            <input
                                type={'email'}
                                name={'inputEmail'}
                                placeholder={'Ingresa tu email'}
                                onChange={handleChange}
                                value={inputEmail}
                                className="rounded-md p-3"
                                autoComplete="on"
                            />
                        </div>
                        <div className="mt-4">
                            <input
                                type={'password'}
                                name={'inputPassword'}
                                placeholder={'Ingresa tu password'}
                                onChange={handleChange}
                                value={inputPassword}
                                autoComplete="off"
                                className="rounded-md p-3"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-4 mb-4">
                        <button className="btn bg-black hover:bg-gray-200 hover:text-black text-white px-4 rounded text-center mr-4">Login</button>
                        <button
                            type={'button'}
                            onClick={handleLoginGoogle}
                            className="btn btn--link"
                        >Login with GMAIL</button>
                    </div>

                    <p>Si no tienes cuenta regístrate <Link to={'/auth/register'}>aquí</Link></p>
                </form>


                {
                    errorMsg ?
                        <p className="text--error">{errorMsg}</p>
                        :
                        ''
                }

            </div>



        </>
    )
}