import React from 'react'
import ReactDOM from 'react-dom/client'
import { TodoApp } from './TodoApp.jsx'
import './assets/styles/main.scss';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <TodoApp/>
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>,
)
