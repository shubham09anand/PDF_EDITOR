import { configureStore } from '@reduxjs/toolkit';
import documentSlice from '../Features/Counter/counterSlice';
import LoginSlice from '../Features/Counter/LoginSlice';


export default configureStore({
  reducer: {
    LoginSlice: LoginSlice,
    documentSlice: documentSlice,
  },
})