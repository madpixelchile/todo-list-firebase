

import { createSlice } from '@reduxjs/toolkit'; 

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        isLoading: false,
        todoList: [
            // {
            //     id: 1,
            //     text: '',
            //     date: '',
            //     idDone: false,
            // }
        ]
    },
    reducers: {
        isLoading: (state)=>{
            state.isLoading = true;
        },
        addTodo: (state, { payload })=>{
            state.isLoading = false;
            state.todoList.push( ...payload );
        },
        removeTodo: (state, { payload })=>{
            state.isLoading = false;
            state.todoList = state.todoList.filter((item)=> item.id !== payload );
        },
        editTodo: (state, { payload })=>{
            state.isLoading = false;
            const index = state.todoList.findIndex((item)=> item.id === payload.id );
            state.todoList[index].text = payload.text;
            state.todoList[index].isDone = payload.isDone;
        },
        clearAllTodo: ( state )=>{
            state.isLoading = false;
            state.todoList = [];
        }
    }
});

export const { isLoading, addTodo, removeTodo, editTodo, editDone, clearAllTodo, processingData } = todoSlice.actions;