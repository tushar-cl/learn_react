import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('post/login' , (credential) =>{
    const options = {
      method: 'POST',
      url: 'http://localhost:1337/api/auth/local',
      headers: {'Content-Type': 'application/json'},
      data: credential
    };
    return axios.request(options)
  })

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loginRes: [],
    status:'idle',
    error:null
  },

  reducers: {
   
  },
  extraReducers (builder) {
    builder
    .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("action" , action.payload)
        state.status = 'succeeded';
        state.loginRes.push(action.payload.data)
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }

  
});

// export const { setFormData } = formSlice.actions;
export default loginSlice.reducer;