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
  return staffs;
});

export const fetchStaffsSalary = createAsyncThunk(
  'staffs/fetchAll',
  async () => {
    const staffs = await staffAPI.fetchAllwithSalary();
    return staffs;
  }
);

export const fetchStaffsByDeptId = createAsyncThunk(
  'staffs/fetchStaffsByDeptId',
  async (deptId, thunkAPI) => {
    const staffs = await staffAPI.fetchByDeptId(deptId);
    return staffs;
  }
);

export const addStaff = createAsyncThunk(
  'staffs/addStaff',
  (newStaff, thunkAPI) => {
    return staffAPI.addOne(newStaff).then((staffs) => staffs.at(-1)); //! ES2022 get lastEle
  }
);

export const deleteStaff = createAsyncThunk(
  'staffs/deleteStaff',
  async (staffId, thunkAPI) => {
    const staffs = staffAPI.deleteOne(staffId);
    return staffs;
  }
);

export const editStaff = createAsyncThunk(
  'staffs/editStaff',
  async (staff, thunkAPI) => {
    const editedStaff = staffAPI.editOne(staff);
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
    builder.addCase(deleteStaff.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteStaff.fulfilled, (state, action) => {
      state.loading = 'succeded';
      state.entities = action.payload;
    });
    builder.addCase(deleteStaff.rejected, (state, action) => {
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
