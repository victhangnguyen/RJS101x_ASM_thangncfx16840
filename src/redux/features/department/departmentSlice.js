import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//imp datas
import * as departmentAPI from '../departmentAPI';

//   loading: 'idle' | 'pending' | 'succeeded' | 'failed'
const initialState = {
  loading: 'idle',
  entities: [],
  errorMessage: null,
};

export const fetchDepartments = createAsyncThunk(
  'departments/fetchAll',
  async (_, thunkAPI) => {
    try {
      const departments = await departmentAPI.fetchAll();
      return thunkAPI.fulfillWithValue(departments);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const departmentsSlide = createSlice({
  name: 'deparments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDepartments.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchDepartments.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.entities = action.payload;
    });
    builder.addCase(fetchDepartments.rejected, (state, action) => {
      state.loading = 'failed';
      state.entities = [];
      state.errorMessage = action.payload;
    });
  },
});

export default departmentsSlide.reducer;
