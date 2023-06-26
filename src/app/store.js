import { configureStore } from '@reduxjs/toolkit'
import formSlice from '../features/formData/formSlice' 
import loginSlice from '../features/formData/loginSlice'

export const store = configureStore({
  reducer: {
    form:formSlice,
    login:loginSlice
  },
})