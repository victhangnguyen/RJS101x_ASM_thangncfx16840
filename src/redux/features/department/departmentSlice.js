import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//imp datas
import * as departmentAPI from '../departmentAPI';

//   loading: 'idle' | 'pending' | 'succeeded' | 'failed'
const initialState = {
  loading: 'idle',
  entities: [],
};

export const fetchDepartments = createAsyncThunk(
  'departments/fetchAll',
  (arg, thunkAPI) => {
    return departmentAPI.fetchAll().then((deparments) => deparments);
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
    });
  },
});

export default departmentsSlide.reducer;
