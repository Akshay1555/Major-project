import React, { useState, useEffect } from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { MDBBtn } from 'mdbreact';
import './GoshalaPage.css'; // Import CSS for styling
import './assets/css/main.css';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/vendor/aos/aos.css';
import './assets/vendor/glightbox/css/glightbox.min.css';
import './assets/vendor/swiper/swiper-bundle.min.css';
import AOS from 'aos';
import { useParams } from 'react-router-dom';
import img2 from './dn.jpg';
import img3 from './cow-Pic-Zebu-cattle.jpg';
import img1 from './ANI-20221011181239.avif';
import image1 from "./establish date-removebg-preview.png";
import image2 from "./registration-removebg-preview.png";
import image3 from "./landtype-removebg-preview.png";
import image4 from "./LandArea-removebg-preview.png";
import image5 from "./Applicant-removebg-preview.png";
import image6 from "./category-removebg-preview.png";
import imagef from "./facility-removebg-preview.png";
import imageR from "./requirement-removebg-preview.png";
import Payment from "./Payment"

const GoshalaPage = () => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [establishmentDate, setEstablishmentDate] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [pincode, setPincode] = useState('');
  const [taluka, setTaluka] = useState('');
  const [registrationNo, setRegistrationNo] = useState('');
  const [landType, setLandType] = useState('');
  const [landArea, setLandArea] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [requirements, setRequirements] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [facilities, setFacilities] = useState([]);

  const params = useParams();

  useEffect(() => {
    getGoshalaDetails();
    AOS.init({ duration: 1000 });
  }, []);

  const getGoshalaDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/getGoshalas/${params._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setName(data.goshalaName || '');
      setAbout(data.about || '');
      setEstablishmentDate(data.establishmentDate || '');
      setDistrict(data.district || '');
      setState(data.state || '');
      setApplicantName(data.applicantName || '');
      setCity(data.city || '');
      setCategory(data.category || '');
      setAddress(data.address || '');
      setPincode(data.pincode || '');
      setTaluka(data.taluka || '');
      setRegistrationNo(data.registrationNo || '');
      setLandType(data.landType || '');
      setLandArea(data.landArea || '');
      setMobileNumber(data.mobileNumber || '');
      setEmail(data.email || '');
      setRequirements(data.requirements || []);
      setAnimals(data.animals || []);
      setFacilities(data.facilities || []);
    } catch (error) {
      console.error('Error fetching Goshala details:', error);
      // Handle error UI here, like showing an error message
    }
  };

  return (
    <>
      <section className="goshala-page">
        <h1 className='goshalaPageh1'>{name}</h1>
       <div className='about-gs'>
       {/* <div>
          <Payment/>
        </div> */}
        <div className='gos-about'data-aos="fade-up" data-aos-delay="200" >
          <h4>About Goshala</h4>
          {about}
        </div>
        
        <div className='gos-about1' data-aos="fade-up" data-aos-delay="300">
          <div  data-aos="fade-up" data-aos-delay="200">
            <img src={image1}/>
            <h4>Establishment </h4>
            <p>{establishmentDate}</p>
          </div>
          <div data-aos-delay="200">
          <img src={image2}/>
            <h4>Registration No.</h4>
            <h5>{registrationNo}</h5>

          </div>
          <div >
          <img src={image3}/>
            <h4>Land Type</h4>
            <h5>{landType}</h5>
          </div>
          <div >
          <img src={image4}/>
            <h4>Land Area</h4>
            <h5>{landArea} Sq.ft.</h5>
          </div>
          <div >
          <img src={image5}/>
            <h4>Applicant Name</h4>
            <h5>{applicantName}</h5>
          </div>
          <div >
          <img src={image6}/>
            <h4>Category</h4>
            <h5>{category}</h5>

          </div>
        </div>
        </div>
        <div className="animal">
          <h3>Total Animals Counts</h3>
        <div className="animal2">
        {animals.length > 0 && animals.map((item, index) => (
          <div key={index} className="item">
           
            <h1> {item.count}</h1>
            <h3> {item.name}</h3>
          </div>
        ))}
        </div>
        </div>


        <div className="facility"  >

          <h3>Facilities</h3>
          <div className="facility2" >
          {facilities.length > 0 && facilities.map((item, index) => (
          <div key={index} className="item">
            <img src={imagef}/>
            <h3>{item.name}</h3>
          </div>
        ))}
        </div>
        </div>
        <div className="require" >

          <h3>Our Requirements</h3>
          <div className="require2">
          {requirements.length > 0 && requirements.map((item, index) => (
          <div key={index} className="item">
            <h4> {item.purpose}</h4>
            <img src={imageR}/>
            <p>Amount Required: {item.amount}</p>
          </div>

        ))}
        </div>
        </div>
        <div >
          <Payment/>
        </div>
        
       
        
        
        
        <MDBFooter style={{backgroundColor:"#33333"}} className='text-center text-lg-start text-muted'>

      
      
      
      
      <section style={{height:350,}}>
        <MDBContainer style={{backgroundColor:"#33333"}} className='text-center text-md-start mt-3'>
          <h6>Connect with us on</h6>
        <a style={{margin:10,}} href=""><i class="bi bi-twitter"></i></a>
            <a style={{margin:10,}} href=""><i class="bi bi-facebook"></i></a>
            <a style={{margin:10,}} href=""><i class="bi bi-instagram"></i></a>
            <a style={{margin:10,}} href=""><i class="bi bi-linkedin"></i></a>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='gem' className='me-3' />
                 Address
              </h6>
              <p>
               {address} <br/>
              City: {city} <br/>
              Taluka: {taluka} <br/>
              District: {district} <br/>
              State: {state}-{pincode}


              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Our Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                 Milk
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Ghee
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Butter
                </a>
              </p>
              
            </MDBCol>

            

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                {name} Goshala Committee
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
              Email:{email}
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> Mobile Number: {mobileNumber}
              </p>
              
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <a className='text-reset fw-bold' href='#'>
          {name}
        </a>
      </div>
    </MDBFooter>
      </section>

    </>
  );
};

export default GoshalaPage;
