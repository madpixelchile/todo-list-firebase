
import { collection, deleteDoc, doc, getDocs, orderBy, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from './config';

export const loadNotes = async( userID = '' )=>{
    // if( !userID ) throw new Error('El ID de usuario no existe');

    // const testIdForTest = 'id-del-usuario'; //Delete me
    const loggedUserID = userID; //userID
    //acceso a URL de la colección dentro de firebase
    const collectionRef = collection( FirebaseDB, `${ loggedUserID }/todo/notas` );
    const docs = await getDocs(collectionRef, orderBy('date','desc'));

    const notes = [];

    docs._docs.map((item)=>{
        notes.push({
            ...item.data(),
            id: item.id
        })
    });


    if(userID && notes){
        return notes;
    }else{
        return null
    }

}



export const saveNote = async({ uid, text, id, date, isDone })=>{

    try{
        const newNote = { date, text, id, isDone }
        const newDoc = doc( collection( FirebaseDB, `${uid}/todo/notas` ) );
        const responseSetDoc = await setDoc(newDoc, newNote);

        return{
            ok: true,
        }

    }catch(error){
        return{
            ok: false
        }
    }

}

export const editNote = async({ loggedUserID, id, isDone ,text, date })=>{
    try{

        const noteToFirestore = { isDone, text, date }
        const docRef = doc( FirebaseDB, `${ loggedUserID }/todo/notas/${ id }` );
        await setDoc(docRef, noteToFirestore, { merge: true });

        return{
            ok: true
        }

    }catch(error){
        return{
            ok: false
        }
    }
}


export const deleteNote = async({ loggedUserID, id })=>{
    // console.log('ID DE LA WEÁ:', id);
    try{

        const docRef = doc( FirebaseDB, `${ loggedUserID }/todo/notas/${ id }` );
        await deleteDoc( docRef );

        return{
            ok: true
        }

    }catch(error){
        return{
            ok: false
        }
    }

}