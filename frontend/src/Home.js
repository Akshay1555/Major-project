import Carousel from 'react-bootstrap/Carousel';
import banner1 from "./banner1.jpg"
import banner2 from "./banner2.jpg"
import banner4 from "./cow-Pic-Zebu-cattle.jpg"
import video1 from "./homepagevideo.mp4";
import Image from 'react-bootstrap/Image';
import React, { useRef, useEffect } from 'react';
import './Home.css';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

const Home = () => {
    return (
        <>
        <section className="homepage">
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img src={banner1}  style={{height:"70vh",width:"100%",}} alt="Banner 1" />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img src={banner2} style={{height:"70vh",width:"100%",}} alt="Banner 2" />
                    <Carousel.Caption>
                        <h3>सम्पूर्ण गौवंश परम उपकारी है | सबका कर्तव्य है तन, मन, धन लगाकर गौ हत्या पूर्ण रूप से बन्द करावे.</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img src={banner4} style={{height:"70vh",width:"100%",}} alt="Banner 3" />
                    <Carousel.Caption>
                        <h3>गौवंश की रक्षा मे देश की रक्षा समाई हुई है.</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        {/* <video width="100%" height="70%" 
        src={video1} 
        title="video player"
        frameborder="0" allow="autoplay" 
        referrerpolicy="strict-origin-when-cross-origin"></video> */}
            
      <MDBFooter className='text-center text-white' style={{ backgroundColor: '#f1f1f1', width:"100%",margin:0,}}>
      
      <div className='text-center text-dark p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',height:80, }}>
        © 2024 Copyright:
        <a className='text-dark' href='https://mdbootstrap.com/'>
          Goshalas
        </a>
      </div>
    </MDBFooter>
    </section>
</>
    );
};

export default Home;
