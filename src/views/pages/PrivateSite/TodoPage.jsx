
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useForms } from "../../../hooks/useForms";
// import { addTodo } from "../../../store/slices/todoSlice";
import { TodoItem } from "../../../components/TodoItem/TodoItem";
import { startSavingNotes } from "../../../store/todoThunks";
import { PageHeadings } from "../../../components/PageHeadings/PageHeadings";

const initialValues = {
    inputTask: ''
}

export const TodoPage = () => {

    const { handleChange, setInputValue, inputValue } = useForms(initialValues);

    const { inputTask } = inputValue;

    const dispatch = useDispatch();

    const { todoList } = useSelector((state) => state.todo);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!inputValue.inputTask) return;

        dispatch(startSavingNotes({
            text: inputValue.inputTask,
            id: Math.random().toString(),
            date: moment().format().toString(),
            isDone: false
        }));

        setInputValue(initialValues);

    }

    return (
        <>
            <PageHeadings>Todo Page</PageHeadings>
            <div className="todo-block todo-block--init shadow-lg p-5">
                <form onSubmit={handleSubmit}>
                    <p className="mb-2">Agrega una actividad</p>
                    <div className="flex">
                        <input
                            name={'inputTask'}
                            type="text"
                            placeholder='Añade una tarea'
                            value={inputTask}
                            onChange={handleChange}
                            className="rounded-md mr-4 p-3"
                        />
                        <button className="btn bg-black hover:bg-gray-200 hover:text-black text-white px-4 rounded text-center">Agregar</button>
                    </div>
                </form>
            </div>

            {todoList ? todoList.map((item, i) => { return <TodoItem key={i} {...item} /> }) : ''}
        </>
    )
}