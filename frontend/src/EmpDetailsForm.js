import React from 'react';
//import { MdClose } from 'react-icons/md';

const EmpDetailsForm = ({ handleSubmit, handleOnChange, handleclose, rest }) => {
  return (
    <div className='addContainer'>
      <form onSubmit={handleSubmit}>
        <div className='closeButton' onClick={handleclose}></div>
        
        <label htmlFor='name'>Name :</label>
        <input type='text' id='name' name='name' onChange={handleOnChange} value={rest.name} />

        <label htmlFor='email'>Email :</label>
        <input type='email' id='email' name='email' onChange={handleOnChange} value={rest.email} />

        <label htmlFor='password'>Password :</label>
        <input type='password' id='password' name='password' onChange={handleOnChange} value={rest.password} />

        <button className='btn'>Submit</button>
      </form>
    </div>
  );
};

export default EmpDetailsForm;
