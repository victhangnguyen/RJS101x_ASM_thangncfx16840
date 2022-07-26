import { createSlice } from '@reduxjs/toolkit';
import { STAFFS } from '../../../shared/staffs';

const initialState = STAFFS;

const staffsSlice = createSlice({
  name: 'staffs',
  initialState,
  reducers: {
    // getStaffs: (state) => {
    //   state = STAFFS; //! nextState
    //   return state;
    // },
    addStaff: (state, action) => {
      console.log('slice staff: action', action);
      //! nextState
      return [...state, { id: Date.now(), ...action.payload }];
    },
  },
});

export const { getStaffs, addStaff } = staffsSlice.actions;
export default staffsSlice.reducer;
