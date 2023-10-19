
export const createStorageUserData = ({ inputEmail, inputPassword, providerId })=>{
    if( inputEmail && inputPassword ){
        sessionStorage.setItem('userEmail', JSON.stringify(inputEmail));
        sessionStorage.setItem('userPassword', JSON.stringify(inputPassword));
    }
    if( providerId ){
        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("userPassword");

        sessionStorage.setItem('userAuthProvider', JSON.stringify(providerId));
    }
}

export const getStorageUserData = ()=>{
    const userEmail = sessionStorage.getItem('userEmail') || '';
    const userPassword = sessionStorage.getItem('userPassword' || '');
    const userAuthProvider = sessionStorage.getItem('userAuthProvider' || '');

    if( userAuthProvider ){
        return{
            authProvider: JSON.parse(userAuthProvider)
        }
    }else if( userEmail && userPassword ){
        return{
            inputEmail: JSON.parse(userEmail),
            inputPassword: JSON.parse(userPassword)
        }
    }else{
        return false;
    }



}

export const clearStorageUserData = ()=>{
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("userPassword");
    sessionStorage.removeItem("userAuthProvider");
}