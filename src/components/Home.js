import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

const Home = (state) => {
    const location = useLocation();
    console.log(location.state)
    const back=()=>{
      navigate('/form')
    } 

  return (
    <div>
      <h2>Welcome</h2>
      <table>
        <thead>   
          <tr>
            <th>Name</th>
            <th>Select Time</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {location.state.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.option}</td>
              <td>{data.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button  onClick={back}>Back</button>
    </div>
  );
};

export default Home;
