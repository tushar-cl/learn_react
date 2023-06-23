import React, { useState , useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import { postFormData , getFormData} from '../features/formData/formSlice';


const Form = () => {
  const dispatch = useDispatch();
  const navigation  = new useNavigate();


  const formData = useSelector((state) => state.form.formData);
  const status = useSelector((state) => state.form.status);
  const error = useSelector((state) => state.form.error);
  const [authenticated, setAuthenticated] = useState(false);
  console.log("faisfihishf",formData.data , status)

  useEffect(() => {
    dispatch(getFormData());
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);
 

  const [name, setName] = useState('');
  const [option, setOption] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [ampm, setAmPm] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleOptionChange = (event) => {
    setOption(event.target.value);
  };

  const handleHourChange = (event) => {
    setHour(event.target.value);
  };

  const handleMinuteChange = (event) => {
    setMinute(event.target.value);
  };

  const handleDayZone = (event) => {
    setAmPm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!name || !option || !hour || !minute || !ampm){
      alert("please fill the form")
      return
    }
    if((hour<1 || hour>24) || (minute<1 ||  minute>60)){
      alert("please provide the correct data")
      return 
    }
    const newData = {
      name: name,
      option: option,
      time: `${hour}:${minute} ${ampm}`,
    };
    dispatch(postFormData(newData));

    setName('');
    setOption('');
    setHour('');
    setMinute('');
    setAmPm('');
  };

  const navigate =()=>{
    console.log('navigate')
    navigation('/home' , {state: formData})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Select Time:
          <select value={option} onChange={handleOptionChange}>
            <option value="">Select an option</option>
            <option value="in">In</option>
            <option value="out">Out</option>
          </select>
        </label>
        <br />
        <label>
          Time:
          <input
            type="number"
            value={hour}
            onChange={handleHourChange}
            placeholder="Hour"
          />
          :
          <input
            type="number"
            value={minute}
            onChange={handleMinuteChange}
            placeholder="Minute"
          />
          <select value={ampm} onChange={handleDayZone}>
            <option value="">Select an option</option>
            <option value="am">am</option>
            <option value="pm">pm</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <button type="navigate" onClick={navigate}>Naviagate</button>
      {status !== 'loading' &&  status !== 'idle' &&(
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
                <td>{data.attributes.select_time}</td>
                <td>{data.attributes.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Form;
