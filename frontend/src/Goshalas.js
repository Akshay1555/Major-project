// Goshalas.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Goshalas.css'; // Import your CSS file
import image1 from './cows-green-field-sunny-day.jpg';
import { Link } from 'react-router-dom';

const Goshalas = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/getGoshalas')
      .then(users => setUsers(users.data))
      .catch(err => console.log(err));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter the displayed Goshalas based on the search term
  const filteredGoshalas = users.filter(user =>
    user.goshalaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='goshala-container'>
      {/* Search bar */}
      <div className='goshala'>
        <input
          type="text"
          className='search'
          placeholder="Search Goshalas..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Display Goshalas based on the search term */}
      {filteredGoshalas.length > 0 ? (
        <div className="goshala-container">
          {filteredGoshalas.map(user => (
            <div key={user._id} className="goshala-card">
              <img src={image1} alt="Goshala" />
              <h3 className='goshalasH3'>{user.goshalaName}</h3>
              <p className='goshalasP'>District: {user.district}</p>
              <Link to={"/GoshalaPage/"+user._id} className='visitGoshalBtn'>Visit</Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No matching Goshalas found.</p>
      )}
    </div>
  );
};

export default Goshalas;
