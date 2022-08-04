import {configureStore} from '@reduxjs/toolkit';
import tilReducer from './modules/tilSlice';

const store = configureStore({
    reducer:{
        til: tilReducer,
    },
});

export default store;