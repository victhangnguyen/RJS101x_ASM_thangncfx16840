import { createSlice } from '@reduxjs/toolkit';
import { STAFFS } from '../../../shared/staffs';

const initialState = [];

const staffsSlice = createSlice({
  name: 'staffs',
  initialState,
  reducers: {
    getStaffs: (state) => {
      state = STAFFS; //! nextState
      return state;
    },
    addStaff: (state) => {},
  },
});

export const { getStaffs, addStaff } = staffsSlice.actions;
export default staffsSlice.reducer;
