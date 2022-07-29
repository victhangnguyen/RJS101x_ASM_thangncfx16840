import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../shared/baseUrl';
// import { STAFFS } from '../../../shared/staffs';

//! TS interface
// interface UsersState {
//   entities: []
//   loading: 'idle' | 'pending' | 'succeeded' | 'failed'
// }

const initialState = {
  entities: [],
  loading: 'idle',
};

// postStaff: (state, action) => {
//   console.log('slice staff: action', action);
//   //! nextState
//   return [...state, { id: Date.now(), ...action.payload }];
// },

export const fetchStaffs = createAsyncThunk('staffs/fetchAll', async () => {
  const inputUrl = baseUrl + 'staffs';
  const response = await fetch(inputUrl);
  const staffs = await response.json();
  // return staffs.data; //! server

  // console.log(
  //   '%c_fetchStaff thunkAct: ',
  //   'color: blue; font-weight: bold',
  //   staffs
  // ); //! __DEBUG

  return staffs;
});

const staffsSlice = createSlice({
  name: 'staffs',
  initialState,
  reducers: {
    // addStaffs: (state) => {
    //   state = STAFFS; //! nextState
    //   return state;
    // },
  },
  extraReducers: (builer) => {
    builer.addCase(fetchStaffs.pending, (state) => {
      state.loading = 'pending';
    });
    builer.addCase(fetchStaffs.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = 'succeeded';
    });
    builer.addCase(fetchStaffs.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});

export const { getStaffs } = staffsSlice.actions;
export default staffsSlice.reducer;
