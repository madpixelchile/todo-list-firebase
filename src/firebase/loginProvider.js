import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, signInWithPopup, GoogleAuthProvider, setPersistence, browserSessionPersistence, signInWithRedirect } from "firebase/auth";
import { FirebaseAuth } from "./config"


const auth = getAuth();

const errors = (error) => {
    switch (error) {
        case 'auth/too-many-requests':
            return 'Demasiados intentos, prueba más tarde.';
        case 'auth/wrong-password':
            return 'Password incorrecto.';
        case 'auth/user-not-found':
            return 'Usuario no encontrado.';
        case 'auth/missing-password':
            return 'Ingresa un Password.'
        case 'auth/invalid-email':
            return 'Ingresa un email válido.';
        case 'auth/weak-password':
            return 'Ingresa un password de al menos 6 caracteres.'
    }
    return error;
}


const googleProvider = new GoogleAuthProvider();
export const loginWithGmail = async () => {

    try {
        const response = await signInWithPopup(FirebaseAuth, googleProvider);
        // console.log('RESPONSE LOGIN GMAIL:', response);

        if (response) {
            return {
                ok: true,
                user: response
            }
        }

    } catch (error) {
        return {
            ok: false,
            error: errors(error.code)
        }
    }

}

export const loginWithEmailPassword = async ({ inputEmail, inputPassword }) => {

    try {

        const response = await signInWithEmailAndPassword(FirebaseAuth, inputEmail, inputPassword);

        if (response) {
            return {
                ok: true,
                user: response
            }
        }

    } catch (error) {
        return {
            ok: false,
            error: errors(error.code)
        }
    }

}

// await setPersistence(auth, browserSessionPersistence).then(() => {
//     // Existing and future Auth states are now persisted in the current
//     // session only. Closing the window would clear any existing state even
//     // if a user forgets to sign out.
//     // ...
//     // New sign-in will be persisted with session persistence.
//     return signInWithEmailAndPassword(auth, email, password);
// }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
// });



export const getUserLoginPersistance = async({ inputEmail, inputPassword })=>{
    try{

        await setPersistence(auth, browserSessionPersistence);
        const response = await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
        if (response) {
            return {
                ok: true,
                user: response
            }
        }

    }catch(error){
        return {
            ok: false,
            error: errors(error.code)
        }
    }

}

export const createAccountNameMailPassword = async ({ inputName, inputEmail, inputPassword }) => {
    try {
        const response = await createUserWithEmailAndPassword(FirebaseAuth, inputEmail, inputPassword);
        await updateProfile(auth.currentUser, { displayName: inputName });

        if (response) {
            return {
                ok: true,
                user: response
            }
        }

    } catch (error) {
        return {
            ok: false,
            error: errors(error.code)
        }
    }
}

export const userLogout = async () => {
    try {
        // Intenta realizar el cierre de sesión
        await FirebaseAuth.signOut();
        // Si el cierre de sesión es exitoso, devuelve un objeto con una propiedad 'success' a true
        return { success: true };
    } catch (error) {
        // Si ocurre un error durante el cierre de sesión, devuelve un objeto con una propiedad 'error' que contiene el mensaje de error.
        return { error: error.message };
    }
}