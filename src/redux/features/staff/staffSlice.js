import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as staffAPI from '../staffAPI';
import { baseUrl } from '../../../shared/baseUrl';

//! interfaceTS
// interface UsersState {
//   entities: []
//   loading: 'idle' | 'pending' | 'succeeded' | 'failed'
// }

export const fetchStaffById = createAsyncThunk(
  'staffs/fetchByIdStatus',
  async (staffId, thunkAPI) => {
    try {
      const staff = await staffAPI.fetchById(staffId);
      return thunkAPI.fulfillWithValue(staff);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchStaffs = createAsyncThunk(
  'staffs/fetchAll',
  async (_, thunkAPI) => {
    try {
      const staffs = await staffAPI.fetchAll();
      return thunkAPI.fulfillWithValue(staffs);

      // return staffs;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchStaffsSalary = createAsyncThunk(
  'staffs/fetchAll',
  async (_, thunkAPI) => {
    try {
      const staffs = await staffAPI.fetchAllwithSalary();
      return thunkAPI.fulfillWithValue(staffs);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchStaffsByDeptId = createAsyncThunk(
  'staffs/fetchStaffsByDeptId',
  async (deptId, thunkAPI) => {
    try {
      const data = await staffAPI.fetchByDeptId(deptId);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addStaff = createAsyncThunk(
  'staffs/addStaff',
  (newStaff, thunkAPI) => {
    return staffAPI.addOne(newStaff);
  }
);

export const editStaff = createAsyncThunk(
  'staffs/editStaff',
  async (staff, thunkAPI) => {
    try {
      const editedStaff = await staffAPI.editOne(staff);
      return thunkAPI.fulfillWithValue(editedStaff);
    } catch (error) {
      alert(
        `Lỗi ${error.message}. Bạn không thể chỉnh sữa nhân viên lúc này, xin vui lòng thử lại sau!`
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteStaff = createAsyncThunk(
  'staffs/deleteStaff',
  async (staffId, thunkAPI) => {
    try {
      const staffs = await staffAPI.deleteOne(staffId);
      return thunkAPI.fulfillWithValue(staffs);
    } catch (error) {
      alert(
        `Lỗi ${error.message}. Bạn không thể xóa nhân viên lúc này, xin vui lòng thử lại sau!`
      );
      return thunkAPI.rejectWithValue(error.message);
    }
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
    builder.addCase(fetchStaffById.pending, (state) => {
      state.entities = [];
      state.loading = 'pending';
    });
    builder.addCase(fetchStaffById.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.entities = action.payload;
    });
    builder.addCase(fetchStaffById.rejected, (state, action) => {
      state.loading = 'failed';
      state.entities = [];
      state.errorMessage = action.payload;
    });
    builder.addCase(fetchStaffs.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchStaffs.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.entities = action.payload;
    });
    builder.addCase(fetchStaffs.rejected, (state, action) => {
      state.loading = 'failed';
      state.entities = [];
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
      state.loading = 'succeeded';
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
      state.loading = 'succeeded';
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
    builder.addCase(fetchStaffsByDeptId.rejected, (state, action) => {
      state.loading = 'failed';
      state.errorMessage = action.payload;
    });
  },
});

export const { getStaffs } = staffsSlice.actions;
export default staffsSlice.reducer;
