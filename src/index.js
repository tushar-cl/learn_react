import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store'
import { Provider } from 'react-redux'
import axiosInstance from './components/api/api_instance';


axiosInstance.interceptors.request.use(request=> {
  console.log("Interseptor request" , request)
  return request
});

axiosInstance.interceptors.response.use(response => {
  console.log(response.status)  
  if(response.status===401){
    }
    return response
  });
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)


