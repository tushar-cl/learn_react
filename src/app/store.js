import { configureStore } from '@reduxjs/toolkit'
import formSlice from '../features/formData/formSlice' 

export const store = configureStore({
  reducer: {
    form:formSlice
  },
})