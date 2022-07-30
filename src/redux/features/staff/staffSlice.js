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
    const staff = await staffAPI.fetchById(staffId);
    return staff;
  }
);

export const fetchStaffs = createAsyncThunk('staffs/fetchAll', async () => {
  const staffs = await staffAPI.fetchAll();
  // console.log('%c_fetchStaff', 'color: violet; font-weight: bold', staffs); //! __DEBUG
  return staffs;
});

export const fetchStaffsSalary = createAsyncThunk(
  'staffs/fetchAll',
  async () => {
    const staffs = await staffAPI.fetchAllwithSalary();
    // console.log(
    //   '%c_fetchStaffsSalary',
    //   'color: violet; font-weight: bold',
    //   staffs
    // ); //! __DEBUG
    return staffs;
  }
);

export const fetchStaffsByDeptId = createAsyncThunk(
  'staffs/fetchStaffsByDeptId',
  async (deptId, thunkAPI) => {
    const staffs = await staffAPI.fetchByDeptId(deptId);
    // console.log(
    //   '%c_fetchStaffByDeptId: ',
    //   'color: violet; font-weight: bold',
    //   staffs
    // ); //! __DEBUG

    return staffs;
  }
);

export const addStaff = createAsyncThunk(
  'staffs/addStaff',
  (newStaff, thunkAPI) => {
    return staffAPI.add(newStaff).then((staffs) => staffs.at(-1)); //! ES2022 get lastEle
  }
);

export const editStaff = createAsyncThunk(
  'staffs/editStaff',
  async (staff, thunkAPI) => {
    const editedStaff = staffAPI.edit(staff);
    return editedStaff;
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
  reducers: {},
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
    builder.addCase(editStaff.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(editStaff.fulfilled, (state, action) => {
      state.loading = 'succeded';
      state.entities = action.payload;
    });
    builder.addCase(editStaff.rejected, (state, action) => {
      state.loading = 'failed';
      state.entities = [];
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
    builder.addCase(fetchStaffById.pending, (state) => {
      state.loading = 'pending';
      state.entities = [];
    });
    builder.addCase(fetchStaffById.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.entities = action.payload;
    });
    builder.addCase(fetchStaffById.rejected, (state, action) => {
      state.loading = 'failed';
      state.errorMessage = action.payload;
    });
  },
});

export const { getStaffs } = staffsSlice.actions;
export default staffsSlice.reducer;
