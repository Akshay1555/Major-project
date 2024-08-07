import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './UpdateInfo.css';
import list from './list.json';
import Swal from 'sweetalert2'
const UpdateInfo = () => {
  const location = useLocation();
  const userId = location.state?.user?._id;

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
  const [requirements, setRequirements] = useState([{ purpose: "", amount: "" }]);
  const [animals, setAnimals] = useState([{ name: "", count: "" }]);
  const [facilities, setFacilities] = useState([{ name: "" }]);

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
  });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMobileNumber = (mobileNumber) => /^\d{10}$/.test(mobileNumber);
  const containsNumber = (str) => /\d/.test(str);
  const validateField = (value) => !value || containsNumber(value);

  const handleFieldBlur = (field) => setTouchedFields({ ...touchedFields, [field]: true });

  const fetchGoshalaData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/getGoshalas/${userId}`);
      const data = await response.json();
      if (response.ok) {
        
        const {
          goshalaName, establishmentDate, about, address, city, pincode,
          district, state, applicantName, registrationNo, landType,
          landArea, category, mobileNumber, email,
          requirements, animals, facilities
        } = data;
        setGoshalaName(goshalaName || "");
        setEstablishmentDate(establishmentDate ? establishmentDate.substring(0, 10) : "");
        setAbout(about || "");
        setAddress(address || "");
        setCity(city || "");
        setPincode(pincode || "");
        setDistrict(district || "");
        setState(state || "");
        setApplicantName(applicantName || "");
        setRegistrationNo(registrationNo || "");
        setLandType(landType || "");
        setLandArea(landArea || "");
        setCategory(category || "");
        setMobileNumber(mobileNumber || "");
        setEmail(email || "");
        setRequirements(requirements || [{ purpose: "", amount: "" }]);
        setAnimals(animals || [{ name: "", count: "" }]);
        setFacilities(facilities || [{ name: "" }]);
        Window.alert("Data Successfully Updated");
      } else {
        console.error('Failed to fetch Goshala details');
      }
    } catch (error) {
      console.error('Error fetching Goshala details:', error);

    }
  };

  useEffect(() => {
    if (userId) {
      fetchGoshalaData();
    }
  }, [userId]);

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

  const updateProduct = async () => {
    setError(false);

    if (
      !goshalaName || !establishmentDate || !about || !address || !city || !pincode ||
      !district || !state || !applicantName || !registrationNo || !landType ||
      !landArea || !category || !mobileNumber || !email
    ) {
      setError(true);
      return false;
    }

    if (!validateMobileNumber(mobileNumber) || !validateEmail(email)) {
      setError(true);
      return false;
    }

    try {
      const response = await fetch(`http://localhost:8000/updateGoshala/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goshalaName, establishmentDate, about, address, city, pincode,
          district, state, applicantName, registrationNo, landType,
          landArea, category, mobileNumber, email,
          requirements, animals, facilities
        }),
      });

      if (response.ok) {
        console.log('Goshala details updated successfully');
        alert('Goshala details updated successfully');
        fetchGoshalaData(); // Fetch the updated data
      } else {
        console.error('Failed to update Goshala details');
      }
    } catch (error) {
      console.error('Error updating Goshala details:', error);
    }
  };

  return (
    <div className='UpdateContainer'>
      <h1>Update Details</h1>
      <label>Goshala Name</label>
      <input
        type='text'
        className='inputBox'
        value={goshalaName}
        onChange={(e) => setGoshalaName(e.target.value)}
        onBlur={() => handleFieldBlur("goshalaName")}
      />
      {error && touchedFields.goshalaName && validateField(goshalaName) && <span className="invalid">Enter a valid name without numbers</span>}
      <label>Establishment Date</label>
      <input
        type='date'
        className='inputBox'
        value={establishmentDate}
        onChange={(e) => setEstablishmentDate(e.target.value)}
        onBlur={() => handleFieldBlur("establishmentDate")}
      />
      {error && touchedFields.establishmentDate && !establishmentDate && <span className="invalid">Enter valid date</span>}
      <label>About</label>
      <textarea
        className="inputBox"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        rows={5}
        onBlur={() => handleFieldBlur("about")}
      />
      {error && touchedFields.about && validateField(about) && <span className="invalid">Enter a valid about without numbers</span>}
      <label>Applicant Name</label>
      <input
        type='text'
        className='inputBox'
        value={applicantName}
        onChange={(e) => setApplicantName(e.target.value)}
        onBlur={() => handleFieldBlur("applicantName")}
      />
      {error && touchedFields.applicantName && validateField(applicantName) && <span className="invalid">Enter a valid name without numbers</span>}
      <label>Registration Number</label>
      <input
        type='text'
        className='inputBox'
        value={registrationNo}
        onChange={(e) => setRegistrationNo(e.target.value)}
        onBlur={() => handleFieldBlur("registrationNo")}
      />
      {error && touchedFields.registrationNo && !registrationNo && <span className="invalid">Enter registration no</span>}
      <label>State</label>
      <select
        value={state}
        onChange={handleStateChange}
        onBlur={() => handleFieldBlur("state")}
      >
        <option value="">Select State</option>
        {list.states.map((state, index) => (
          <option key={index} value={state.state}>{state.state}</option>
        ))}
      </select>
      {error && touchedFields.state && !state && <span className="invalid">Select state</span>}
      <label>District</label>
      <select
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        onBlur={() => handleFieldBlur("district")}
      >
        <option value="">Select District</option>
        {list.states
          .find((stateData) => stateData.state === state)?.districts.map((district, index) => (
            <option key={index} value={district}>{district}</option>
          ))}
      </select>
      {error && touchedFields.district && !district && <span className="invalid">Select district</span>}
      <label>City</label>
      <input
        type='text'
        className='inputBox'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onBlur={() => handleFieldBlur("city")}
      />
      {error && touchedFields.city && validateField(city) && <span className="invalid">Enter a valid city without numbers</span>}
      <label>Address</label>
      <textarea
        className="inputBox"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        rows={5}
        onBlur={() => handleFieldBlur("address")}
      />
      {error && touchedFields.address && !address && <span className="invalid">Enter address</span>}
      <label>Pincode</label>
      <input
        type='text'
        className='inputBox'
        value={pincode}
        maxLength={6}
        onChange={(e) => setPincode(e.target.value)}
        onBlur={() => handleFieldBlur("pincode")}
      />
      {error && touchedFields.pincode && !pincode && <span className="invalid">Enter pincode</span>}
      <label>Land Type</label>
      <input
        type='text'
        className='inputBox'
        value={landType}
        onChange={(e) => setLandType(e.target.value)}
        onBlur={() => handleFieldBlur("landType")}
      />
      {error && touchedFields.landType && !landType && <span className="invalid">Enter land type</span>}
      <label>Land Area</label>
      <input
        type='text'
        className='inputBox'
        value={landArea}
        onChange={(e) => setLandArea(e.target.value)}
        onBlur={() => handleFieldBlur("landArea")}
      />
      {error && touchedFields.landArea && !landArea && <span className="invalid">Enter land area</span>}
      <label>Category</label>
      <input
        type='text'
        className='inputBox'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        onBlur={() => handleFieldBlur("category")}
      />
      {error && touchedFields.category && !category && <span className="invalid">Enter category</span>}
      <label>Mobile Number</label>
      <input
        type='text'
        className='inputBox'
        value={mobileNumber}
        maxLength={10}
        onChange={(e) => setMobileNumber(e.target.value)}
        onBlur={() => handleFieldBlur("mobileNumber")}
      />
      {error && touchedFields.mobileNumber && !validateMobileNumber(mobileNumber) && <span className="invalid">Enter a valid mobile number</span>}
      <label>Email</label>
      <input
        type='email'
        className='inputBox'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => handleFieldBlur("email")}
      />
      {error && touchedFields.email && !validateEmail(email) && <span className="invalid">Enter a valid email</span>}

      <label>Requirements</label>
      {requirements.map((requirement, index) => (
        <div key={index} className="dynamic-input">
          <input
            type="text"
            placeholder="Purpose"
            value={requirement.purpose}
            onChange={(e) => handleRequirementChange(index, "purpose", e.target.value)}
          />
          <input
            type="text"
            placeholder="Amount"
            value={requirement.amount}
            onChange={(e) => handleRequirementChange(index, "amount", e.target.value)}
          />
          <button onClick={() => removeRequirement(index)}>Remove</button>
        </div>
      ))}
      <button onClick={addRequirement}>Add Requirement</button>

      <label>Animals</label>
      {animals.map((animal, index) => (
        <div key={index} className="dynamic-input">
          <input
            type="text"
            placeholder="Animal Name"
            value={animal.name}
            onChange={(e) => handleAnimalChange(index, "name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Count"
            value={animal.count}
            onChange={(e) => handleAnimalChange(index, "count", e.target.value)}
          />
          <button onClick={() => removeAnimal(index)}>Remove</button>
        </div>
      ))}
      <button onClick={addAnimal}>Add Animal</button>

      <label>Facilities</label>
      {facilities.map((facility, index) => (
        <div key={index} className="dynamic-input">
          <input
            type="text"
            placeholder="Facility Name"
            value={facility.name}
            onChange={(e) => handleFacilityChange(index, e.target.value)}
          />
          <button onClick={() => removeFacility(index)}>Remove</button>
        </div>
      ))}
      <button onClick={addFacility}>Add Facility</button>

      {error && <span className="invalid">Please fill in all required fields correctly</span>}

      <button onClick={updateProduct} className='appButton'>Update Goshala</button>
    </div>
  );
};

export default UpdateInfo;
