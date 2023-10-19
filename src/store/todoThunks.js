import { deleteNote, editNote, loadNotes, saveNote } from "../firebase/todoProvider";
import { addTodo, clearAllTodo, editTodo, isLoading, removeTodo } from "./slices/todoSlice";

export const startLoadingNotes = ( userID = '' ) => {

    return async ( dispatch ) => {

        if ( userID ) {

            dispatch(isLoading());

            const response = await loadNotes( userID );

            if ( response ) {
                dispatch(addTodo( response ));
            }
        }

    }

}

export const startSavingNotes = ({ text, id, date, isDone }) => {

    return async ( dispatch, getState ) => {

        dispatch(isLoading());

        const loggedUserID = getState().auth.user.uid;

        const response = await saveNote({ uid: loggedUserID, text, id, date, isDone });

        if (response.ok) {
            dispatch(clearAllTodo());
            dispatch(startLoadingNotes(loggedUserID));
        }

    }

}


export const startEditingNotes = ({ id, isDone, text, date }) => {

    return async ( dispatch, getState ) => {

        dispatch(isLoading());

        const loggedUserID = getState().auth.user.uid;

        const response = await editNote({ loggedUserID, id, isDone, text, date });

        if ( response.ok ) {
            dispatch(editTodo({ id, isDone, text }));
        }

    }

}

export const startDeletingNotes = ({ id })=>{

    console.log('ID del borrado:', id);

    return async ( dispatch, getState )=>{

        dispatch(isLoading());

        const loggedUserID = getState().auth.user.uid;

        const response = await deleteNote({ loggedUserID, id });

        if(response.ok){
            dispatch( removeTodo( id ) );
        }

    }

}