import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosInstance } from '../../components/api/api_instance';

const post_URL = 'http://localhost:1337/api/form-datas'

export const postFormData = createAsyncThunk('post/fecthpost', async (formData) => {
  const response = await axiosInstance({
    method: 'POST',
    url: post_URL,
    data: { data: { name: formData.name, select_time: formData.option, time: formData.time } }
  })
  return response.data
})

export const getFormData = createAsyncThunk('get/fecthget', async () => {
  const response = await axiosInstance({
    method: 'GET',
    url: '/form-datas',
  })

  return response.data;
});

const formSlice = createSlice({

  name: 'form',
  initialState: {
    formData: [],
    status: 'idle',
    error: null
  },

  reducers: {
    setFormData: (state, action) => {
      console.log(action.payload)
      state.formData.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postFormData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postFormData.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(postFormData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getFormData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFormData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.formData = action.payload;
      })
      .addCase(getFormData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }

});

export const { setFormData } = formSlice.actions;
export default formSlice.reducer;