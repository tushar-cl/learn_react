import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = new useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function handleSubmit(event){
        event.preventDefault();
        console.log(email , password)
        try {
            const options = {
                method: 'POST',
                url: 'http://localhost:1337/api/auth/local',
                headers: {'Content-Type': 'application/json'},
                data: {identifier: email, password}
              };
              
              const response = await axios.request(options)
              if(response.status==200){
                localStorage.setItem('token', response.data.jwt);
                navigate('/form')
              }
        } catch (error) {
            alert(error.response.data.error.message)
        }
    }
  return (
    <>
        <form onSubmit={handleSubmit}>
        <label>
          email:
          <input type="email" onChange={(event) => {setEmail(event.target.value)}} />
        </label>
        <label>
          password:
          <input type="password" onChange={(event) => {setPassword(event.target.value)}}/>
        </label>
        <br/>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Login