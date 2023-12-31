import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login , setError } from '../features/formData/loginSlice';

function Login() {
  const navigate = new useNavigate()
  const dispatch = useDispatch();
  const loginRes = useSelector((state) => state.login.loginRes);
  const loginStatus = useSelector((state) => state.login.status);
  const error = useSelector((state) => state.login.error);

  if (loginStatus === 'succeeded') {
    navigate('/form')
    console.log("login response:", loginRes)
  }

  if(error != null) {
    console.log(error);
    alert(error);
    dispatch(setError())
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const credential = {
      identifier: email,
      password: password
    }
    dispatch(login(credential))

  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          email:
          <input type="email" onChange={(event) => { setEmail(event.target.value) }} />
        </label>
        <label>
          password:
          <input type="password" onChange={(event) => { setPassword(event.target.value) }} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Login