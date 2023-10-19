
import { configureStore } from '@reduxjs/toolkit';
import { todoSlice } from './slices/todoSlice';
import { authSlice } from './slices/authSlice';

export const store = configureStore({
    reducer: {
        todo: todoSlice.reducer,
        auth: authSlice.reducer,
    },
})