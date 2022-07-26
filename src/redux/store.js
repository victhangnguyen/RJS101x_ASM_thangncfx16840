import { configureStore } from '@reduxjs/toolkit';
import staffsReducer from './features/staffs/staffsSlice';
import departmentsReducer from './features/departments/departmentsSlice';

export const store = configureStore({
  reducer: {
    staffs: staffsReducer,
    departments: departmentsReducer,
  },
});
