import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const post_URL  = 'http://localhost:1337/api/form-datas'
const get_URL = 'http://localhost:1337/api/form-datas'

export const postFormData = createAsyncThunk('post/fecthpost' , async(formData) =>{
  const options = {
    method: 'POST',
    url: post_URL,
    headers: {'Content-Type': 'application/json'},
    data: {data: {name: formData.name, select_time: formData.option , time :formData.time}}
  };
  const response = await axios.request(options)
  return response.data
})

export const getFormData = createAsyncThunk('get/fecthget', async () => {
  const options = {
    method: 'GET',
    url: get_URL,
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await axios.request(options);
  return response.data;
});

const formSlice = createSlice({

  name: 'form',
  initialState: {
    formData: [],
    status:'idle',
    error:null
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