import React, { useState } from "react";
import "./Register.css";
import list from './list.json';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2'
const Register = () => {
  const [goshalaName, setGoshalaName] = useState("");
  const [establishmentDate, setEstablishmentDate] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [landType, setLandType] = useState("");
  const [landArea, setLandArea] = useState("");
  const [category, setCategory] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requirements, setRequirements] = useState([{ purpose: "", amount: "" }]);
  const [animals, setAnimals] = useState([{ name: "", count: "" }]);
  const [facilities, setFacilities] = useState([{ name: "" }]); // Added state for facilities

  const [error, setError] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    goshalaName: false,
    establishmentDate: false,
    about: false,
    address: false,
    city: false,
    pincode: false,
    district: false,
    state: false,
    applicantName: false,
    registrationNo: false,
    landType: false,
    landArea: false,
    category: false,
    mobileNumber: false,
    email: false,
    password: false,
  });

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    const stateData = list.states.find(state => state.state === selectedState);
    setState(selectedState);
    setDistrict(stateData ? stateData.districts[0] : "");
  };

  const handleAnimalChange = (index, field, value) => {
    const newAnimals = [...animals];
    newAnimals[index][field] = value;
    setAnimals(newAnimals);
  };

  const addAnimal = () => setAnimals([...animals, { name: "", count: "" }]);
  const removeAnimal = (index) => setAnimals(animals.filter((_, i) => i !== index));

  const handleRequirementChange = (index, field, value) => {
    const newRequirements = [...requirements];
    newRequirements[index][field] = value;
    setRequirements(newRequirements);
  };

  const addRequirement = () => setRequirements([...requirements, { purpose: "", amount: "" }]);
  const removeRequirement = (index) => setRequirements(requirements.filter((_, i) => i !== index));

  const handleFacilityChange = (index, value) => {
    const newFacilities = [...facilities];
    newFacilities[index].name = value;
    setFacilities(newFacilities);
  };

  const addFacility = () => setFacilities([...facilities, { name: "" }]);
  const removeFacility = (index) => setFacilities(facilities.filter((_, i) => i !== index));

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(password);
  const validateMobileNumber = (mobileNumber) => /^\d{10}$/.test(mobileNumber);
  const validateEstablishmentDate = (date) => {
    if (!date) return false;
    const currentDate = new Date();
    const selectedDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0); // Clear the time part
    return selectedDate < currentDate; // Only accept dates before today
  };
  const containsNumber = (str) => /\d/.test(str);
  const validateField = (value) => !value || containsNumber(value);

  const handleFieldBlur = (field) => setTouchedFields({ ...touchedFields, [field]: true });

  const registerGoshala = async () => {
    setError(false);

    if (
      !goshalaName || !establishmentDate || !about || !address || !city || !pincode ||
      !district || !state || !applicantName || !registrationNo || !landType ||
      !landArea || !category || !mobileNumber || !email || !password
    ) {
      setError(true);
      return false;
    }

    if (!validateMobileNumber(mobileNumber) || !validateEmail(email) || !validatePassword(password)||  
    !validateEstablishmentDate(establishmentDate)) {setError(true);return false;}

    const result = await fetch("http://localhost:8000/registration", {
      method: "post",
      body: JSON.stringify({
        goshalaName,
        establishmentDate,
        about,
        address,
        city,
        pincode,
        district,
        state,
        applicantName,
        registrationNo,
        landType,
        landArea,
        category,
        requirements,
        animals,
        facilities, // Added facilities to the payload
        mobileNumber,
        email,
        password,
        role: "goshalas",
      }),
      headers: { "Content-type": "application/json" },
    });

    const data = await result.json();
    console.log("Registration Response:", data);

    if (data._id) {
    
      setGoshalaName("");
      setEstablishmentDate("");
      setAbout("");
      setAddress("");
      setCity("");
      setPincode("");
      setDistrict("");
      setState("");
      setApplicantName("");
      setRegistrationNo("");
      setLandType("");
      setLandArea("");
      setCategory("");
      setMobileNumber("");
      setEmail("");
      setPassword("");
      setRequirements([{ purpose: "", amount: "" }]);
      setAnimals([{ name: "", count: "" }]);
      setFacilities([{ name: "" }]);
   window.alert("Registration Successful.")
    } else {
      setError(true);
    }
  };

  return (
    <div className="RegisterContainer">
    


      <h1 style={{ textAlign: 'center' }}>Register Goshala</h1>


      <div className="input-control">

    
      <label>Goshala Name</label>
  <input
    type="text"
    placeholder="Goshala name"
    className="inputBox"
    value={goshalaName}
    onChange={(e) => setGoshalaName(e.target.value)}
    onBlur={() => handleFieldBlur("goshalaName")}
  />
  {error && touchedFields.goshalaName && validateField(goshalaName) && <span className="invalid">Enter a valid name without numbers</span>}
  </div>
  <label>Establishment Date</label>
      <input
        type="date"
        className="inputBox"
        value={establishmentDate}
        onChange={(e) => setEstablishmentDate(e.target.value)}
        onBlur={() => handleFieldBlur("establishmentDate")}
      />
      {/* {error && touchedFields.establishmentDate && !establishmentDate && <span className="invalid">Enter valid date</span>} */}
      {error && touchedFields.establishmentDate && !validateEstablishmentDate(establishmentDate) && <span className="invalid">Enter a valid date</span>}

<label>About</label>
<textarea
  placeholder="Add about goshala"
  className="inputBox"
  value={about}
  onChange={(e) => setAbout(e.target.value)}
  onBlur={() => handleFieldBlur("about")}
  rows={5}
/>

{error && touchedFields.about && !about && (
        <span className="invalid">Enter about goshala</span>
      )}


      <label>Applicant Name</label>
<input
  type="text"
  placeholder="Applicant Name"
  className="inputBox"
  value={applicantName}
  onChange={(e) => setApplicantName(e.target.value)}
  onBlur={() => handleFieldBlur("applicantName")}
/>
{error && touchedFields.applicantName && validateField(applicantName) && <span className="invalid">Enter a valid name without numbers</span>}
  
  <label>State</label>
      <select
        value={state}
        onChange={handleStateChange}
        onBlur={() => handleFieldBlur("state")}
        className="inputBox"
      >
        <option>-- choose state --</option>
        {list.states.map((state, index) => (
          <option value={state.state} key={index}>{state.state}</option>
        ))}
      </select>
      {error && touchedFields.state && !state && <span className="invalid">Enter state</span>}
      <label>District</label>
      <select
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        onBlur={() => handleFieldBlur("district")}
        className="inputBox"
      >
        <option>-- choose district --</option>
        {list.states.find(s => s.state === state)?.districts.map((district, index) => (
          <option value={district} key={index}>{district}</option>
        ))}
      </select>
      {error && touchedFields.district && !district && <span className="invalid">Enter valid district</span>}
      <label>City</label>
<input
  type="text"
  placeholder="Enter City"
  className="inputBox"
  value={city}
  onChange={(e) => setCity(e.target.value)}
  onBlur={() => handleFieldBlur("city")}
/>
{error && touchedFields.city && validateField(city) && <span className="invalid">Enter a valid city without numbers</span>} <label>Address</label>
      <input
        type="text"
        placeholder="Enter address"
        className="inputBox"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onBlur={() => handleFieldBlur("address")}
      />
      {error && touchedFields.address && !address && <span className="invalid">Enter address</span>}
      <label>Pincode</label>
      <input
        type="text"
        placeholder="Pincode"
        maxLength="6"
        className="inputBox"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        onBlur={() => handleFieldBlur("pincode")}
      />
      {error && touchedFields.pincode && !pincode && <span className="invalid">Enter valid pincode</span>}
      
      <label>Registration No</label>
      <input
        type="text"
        placeholder="Enter Registration No"
        className="inputBox"
        value={registrationNo}
        onChange={(e) => setRegistrationNo(e.target.value)}
        onBlur={() => handleFieldBlur("registrationNo")}
      />
      {error && touchedFields.registrationNo && !registrationNo && <span className="invalid">Enter registration no</span>}
      <label>Land Type</label>
      <select
        id="landType"
        className="inputBox"
        value={landType}
        onChange={(e) => setLandType(e.target.value)}
        onBlur={() => handleFieldBlur("landType")}
      >
        <option value="onLease">On lease</option>
        <option value="onRent">On rent</option>
        <option value="owned">Owned</option>
        <option value="gauchar">Gauchar</option>
      </select>
      {error && touchedFields.landType && !landType && (
        <span className="invalid">Select land type</span>
      )}
      <label>Land Area
        <span className="text-danger">*</span>
        <span className="formHelpNote">Enter area in Sq.ft only</span>
      </label>
      <input
        type="text"
        placeholder="Land Area"
        className="inputBox"
        value={landArea}
        onChange={(e) => setLandArea(e.target.value)}
        onBlur={() => handleFieldBlur("landArea")}
      />
      {error && touchedFields.landArea && !landArea && (
        <span className="invalid">Enter land area</span>
      )}

      <label>Land Category</label>
      <select
        id="category"
        className="inputBox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        onBlur={() => handleFieldBlur("category")}
      >
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
        <option value="extraLarge">Extra Large</option>
      </select>
      {error && touchedFields.category && !category && (
        <span className="invalid">Select land category</span>
      )}
      <label>Mobile Number</label>
      <input
        type="text"
        placeholder="Mobile Number"
        className="inputBox"
        maxLength={10}
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        onBlur={() => handleFieldBlur("mobileNumber")}
      />
      {error && touchedFields.mobileNumber && !validateMobileNumber(mobileNumber) && <span className="invalid">Enter valid mobile number</span>}
      <label>Email</label>
      <input
        type="text"
        placeholder="Email"
        className="inputBox"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => handleFieldBlur("email")}
      />
      {error && touchedFields.email && !validateEmail(email) && <span className="invalid">Enter valid email</span>}
      <label>Password</label>
      <input
        type="password"
        placeholder="Password"
        className="inputBox"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => handleFieldBlur("password")}
      />
      {error && touchedFields.password && !validatePassword(password) && <span className="invalid">Password must be at least 8 characters long with one <br></br>uppercase, one lowercase, one number, and one special character</span>}
      
     {/* Animal Details */}
     <label>Enter Animal Types and Count</label>
{animals.map((animal, index) => (
  <div key={index} className="inputBox">
    <input
      type="text"
      placeholder="Animal type"
      value={animal.name}
      onChange={(e) => handleAnimalChange(index, "name", e.target.value)}
      onBlur={() => handleFieldBlur(`animal${index}`)}
    />
    {error && touchedFields[`animal${index}`] && validateField(animal.name) && <span className="invalid">Enter a valid type without numbers</span>}
    <input
      type="number"
      placeholder="Count"
      value={animal.count}
      onChange={(e) => handleAnimalChange(index, "count", e.target.value)}
      onBlur={() => handleFieldBlur(`animal${index}`)}
    />
    {/* Validation for count */}
    <button type="button" onClick={() => removeAnimal(index)} className="removeButton">Remove</button>
  </div>
))}
<button type="button" onClick={addAnimal} className="AddButton">Add Animal</button>

{/* Requirements */}
<label>Enter Requirements for goshala</label>
{requirements.map((requirement, index) => (
  <div key={index} className="inputBox">
    <input
      type="text"
      placeholder="Purpose"
      value={requirement.purpose}
      onChange={(e) => handleRequirementChange(index, "purpose", e.target.value)}
      onBlur={() => handleFieldBlur(`requirement${index}`)}
    />
    {error && touchedFields[`requirement${index}`] && validateField(requirement.purpose) && <span className="invalid">Enter a valid purpose without numbers</span>}
    <input
      type="number"
      placeholder="Amount"
      value={requirement.amount}
      onChange={(e) => handleRequirementChange(index, "amount", e.target.value)}
      onBlur={() => handleFieldBlur(`requirement${index}`)}
    />
    {/* Validation for amount */}
    <button type="button" onClick={() => removeRequirement(index)} className="removeButton">Remove</button>
  </div>
))}
<button type="button" onClick={addRequirement} className="AddButton">Add Requirement</button>

{/* Facilities */}
<label>Enter facilities </label>
{facilities.map((facility, index) => (
  <div key={index} className="inputBox">
    <input
      type="text"
      placeholder="Facility Name"
      value={facility.name}
      onChange={(e) => handleFacilityChange(index, e.target.value)}
      onBlur={() => handleFieldBlur(`facility${index}`)}
    />
    {error && touchedFields[`facility${index}`] && validateField(facility.name) && <span className="invalid">Enter a valid name without numbers</span>}
    <button type="button" onClick={() => removeFacility(index)} className="removeButton">Remove</button>
  </div>
))}
<button type="button" onClick={addFacility} className="AddButton" >Add Facility</button>
{error && <span className="invalid">Please fill in all required fields correctly</span>}

      <button onClick={registerGoshala} className="registerButton">Register</button>
      {/* {error && <p className="error-message">Please fill all fields correctly.</p>} */}
    </div>
  );
};

export default Register;
