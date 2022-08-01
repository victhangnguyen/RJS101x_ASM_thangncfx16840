import { configureStore, middleware } from '@reduxjs/toolkit';
import staffsReducer from '../features/staff/staffSlice';
import departmentsReducer from '../features/department/departmentSlice';
//! Middlewares
import logger from 'redux-logger';

// const middleware = [logger];

export const store = configureStore({
  reducer: {
    staffs: staffsReducer,
    departments: departmentsReducer,
  },
  // middleware: (gDM) => gDM().concat(logger),
});
