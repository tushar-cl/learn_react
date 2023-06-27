import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {axiosInstance, configureAxiosInterceptors, resetAxiosInterceptors} from '../../components/api/api_instance';

export const login = createAsyncThunk('post/login', (credential) => {
  console.log('login thunk called');
  return axiosInstance({
    method: 'POST',
    url: '/auth/local',
    data: credential
  })
})

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loginRes: null,
    status: 'idle',
    error: null
  },

  reducers: {
    setError:(state)=>{
      state.status='idle'
      state.error=null
      state.loginRes = null;
      localStorage.clear();

    },
    logoutAction : (state) =>{
      state.status = 'idle'
      state.error = null;
      state.loginRes = null
      localStorage.clear();
      resetAxiosInterceptors();
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("action", action.payload)
        state.status = 'succeeded';
        state.loginRes = action.payload;
        
        localStorage.setItem("jwt", action.payload.data.jwt);
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
        configureAxiosInterceptors();
        //call configureAxiosInterceptor(state)
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }


});

export const { setError , logoutAction} = loginSlice.actions;
export default loginSlice.reducer;