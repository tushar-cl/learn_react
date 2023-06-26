import React from 'react';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

const Home = (state) => {
  const navigate = new useNavigate()
    const formData = useSelector((state) => state.form.formData);
    console.log(formData)
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
          {formData.data.map((data, index) => (
            <tr key={index}>
              <td>{data.attributes.name}</td>
              <td>{data.attributes.option}</td>
              <td>{data.attributes.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button  onClick={back}>Back</button>
    </div>
  );
};

export default Home;
