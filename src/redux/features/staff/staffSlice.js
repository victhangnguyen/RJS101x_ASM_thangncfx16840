import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as staffAPI from '../staffAPI';

//! interfaceTS
// interface UsersState {
//   entities: []
//   loading: 'idle' | 'pending' | 'succeeded' | 'failed'
// }

export const fetchStaffById = createAsyncThunk(
  'staffs/fetchByIdStatus',
  async (staffId, thunkAPI) => {
    
  }
);

export const fetchStaffs = createAsyncThunk('staffs/fetchAll', async () => {
  const staffs = await staffAPI.fetchAll();
  console.log('%c_fetchStaff', 'color: violet; font-weight: bold', staffs); //! __DEBUG
  return staffs;
});

export const fetchStaffsSalary = createAsyncThunk(
  'staffs/fetchAll',
  async () => {
    const staffs = await staffAPI.fetchAllwithSalary();
    console.log(
      '%c_fetchStaffsSalary',
      'color: violet; font-weight: bold',
      staffs
    ); //! __DEBUG
    return staffs;
  }
);

export const fetchStaffsByDeptId = createAsyncThunk(
  'staffs/fetchStaffsByDeptId',
  async (deptId, thunkAPI) => {
    const staffs = await staffAPI.fetchByDeptId(deptId);
    console.log(
      '%c_fetchStaffByDeptId: ',
      'color: violet; font-weight: bold',
      staffs
    ); //! __DEBUG

    return staffs;
  }
);

export const addStaff = createAsyncThunk(
  'staffs/addStaff',
  (newStaff, thunkAPI) => {
    return staffAPI.add(newStaff).then((staffs) => staffs.at(-1)); //! ES2022 get lastEle
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
  extraReducers: (builder) => {
    builder.addCase(fetchStaffs.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchStaffs.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.entities = action.payload;
    });
    builder.addCase(fetchStaffs.rejected, (state, action) => {
      state.loading = 'failed';
      state.errorMessage = action.payload;
    });
    builder.addCase(addStaff.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(addStaff.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.entities.push(action.payload);
    });
    builder.addCase(addStaff.rejected, (state, action) => {
      state.loading = 'failed';
      state.errorMessage = action.payload;
    });
    builder.addCase(fetchStaffsByDeptId.pending, (state) => {
      state.loading = 'pending';
      state.entities = [];
    });
    builder.addCase(fetchStaffsByDeptId.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.entities = action.payload;
    });
    builder.addCase(fetchStaffsByDeptId, (state, action) => {
      state.loading = 'failed';
      state.errorMessage = action.payload;
    });
  },
});

export const { getStaffs } = staffsSlice.actions;
export default staffsSlice.reducer;
