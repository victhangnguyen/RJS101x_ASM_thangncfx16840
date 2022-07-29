import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../shared/baseUrl';
import * as staffAPI from '../staffAPI';

//! TS interface
// interface UsersState {
//   entities: []
//   loading: 'idle' | 'pending' | 'succeeded' | 'failed'
// }

// postStaff: (state, action) => {
//   console.log('slice staff: action', action);
//   //! nextState
//   return [...state, { id: Date.now(), ...action.payload }];
// },

export const fetchStaffs = createAsyncThunk('staffs/fetchAll', async () => {
  const inputUrl = baseUrl + 'staffs';
  const response = await fetch(inputUrl);
  const staffs = await response.json();
  return staffs;
});

//! POST return staffs[]
export const addStaff = createAsyncThunk(
  'staffs/addStaff',
  (newStaff, thunkAPI) => {
    const inputUrl = baseUrl + 'staffs';
    return staffAPI.add(newStaff)
      .then((response) => response.json())
      .then((staffs) => staffs.at(-1)); //! ES2022 get lastEle
  }
);

const initialState = {
  entities: [],
  loading: 'idle',
  errorMessage: null,
};

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
      state.loading = 'succeeded';
      state.entities = action.payload;
    });
    builer.addCase(fetchStaffs.rejected, (state, action) => {
      state.loading = 'failed';
      state.errorMessage = action.payload;
    });
    builer.addCase(addStaff.pending, (state) => {
      state.loading = 'pending';
    });
    builer.addCase(addStaff.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      //! immutate with produce immer
      state.entities.push(action.payload);
    });
    builer.addCase(addStaff.rejected, (state, action) => {
      state.loading = 'failed';
      // state.errorMessage = action.payload;
    });
  },
});

export const { getStaffs } = staffsSlice.actions;
export default staffsSlice.reducer;
