import { createSlice } from '@reduxjs/toolkit';
//imp datas
import { DEPARTMENTS } from '../../../shared/staffs';

const initialState = [];

const departmentsSlide = createSlice({
  name: 'deparments',
  initialState,
  reducers: {
    getDepartments: (state) => {
      state = DEPARTMENTS; //! nextState
      return state;
    },
  },
});

export const { getDepartments } = departmentsSlide.actions;
export default departmentsSlide.reducer;
