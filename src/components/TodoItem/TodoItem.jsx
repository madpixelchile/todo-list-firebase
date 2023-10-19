import { useState } from "react";
import { useForms } from "../../hooks/useForms";
import { useDispatch } from "react-redux";
import { editDone, editTodo, removeTodo } from "../../store/slices/todoSlice";
import { startDeletingNotes, startEditingNotes } from "../../store/todoThunks";

export const TodoItem = ({ id, text, date, isDone }) => {

    const [isEditing, setIsEditing] = useState(false);

    const { inputValue, handleChange } = useForms({
        inputEdit: text
    });

    const dispatch = useDispatch();

    const { inputEdit } = inputValue;

    const handleSubmit = (e) => {
        e.preventDefault();
        if( !inputEdit ) return;
        
        dispatch(startEditingNotes({
            id, 
            isDone,
            text: inputEdit,
            date
        }));

        setIsEditing(false)
    }

    const handleDone = ()=>{
        dispatch(startEditingNotes({
            id, 
            isDone: !isDone,
            text: inputEdit,
            date
        }))
    }

    const handleDelete = ()=>{
        dispatch(startDeletingNotes({ id }))
    }

    return (
        <>
            <div className="ab ls ys p-4 todo-block">
                <form onSubmit={handleSubmit}>
                    <div className="todo-block--info mb-3">
                        <p>{text} <span onClick={handleDone}>Estado: {isDone ? 'Realizado' : 'Pendiente'}</span></p>
                        <div><span>Fecha de creación: </span><span>{date}</span></div>
                    </div>
                    {
                        isEditing ?
                            <>
                                <input
                                    name={'inputEdit'}
                                    type="text"
                                    placeholder='Add Task'
                                    value={inputEdit}
                                    onChange={handleChange}
                                    className="rounded-md mr-4 p-3"
                                />
                                <button
                                className="mr-4"
                                >Guardar</button>
                            </>
                            :
                            <button
                                className="mr-4"
                                type={'button'}
                                onClick={() => setIsEditing(true)}
                            >Editar</button>
                    }
                    
                    <button
                        type={'button'}
                        onClick={handleDelete}
                    >Eliminar</button>

                </form>
            </div>
        </>
    )
}