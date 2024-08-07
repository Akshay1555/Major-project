import React, { useCallback, useState } from 'react';

import useRazorpay from "react-razorpay";
import axios from "axios";
const Payment=()=>{
  const [Razorpay] = useRazorpay();
  const [orderId, setOrderId] =useState("");
  const capture=async(id, am)=>{
    try {
       await axios.post(
        `http://localhost:8000/payment/cp`,
        {
          paymentId:id ,
          amount: am,
        }
      );
      console.log("success")
    } catch (error) {
      console.log(error);
      
    }
  };
  const handleSubmit = async () => {
    try {
      
      const response = await axios.post(
        `http://localhost:8000/payment`,
        {
          amount:100, 
          currency: "INR",
          receipt: "receipt#1",
          notes: {
            payersId: "any"
          },
        },
        { withCredentials: true }
      );
      console.log("order created", response.data.data.id);
      setOrderId(response.data.data.id);
    } catch (error) {
      console.log(error.message);
    }
  };
  

  //  
  
              
             
  
             
    const handlePayment = useCallback(() => {
      handleSubmit();
  
      const options = {
        key: "rzp_test_I0Fbg1GKFsHUFd",
        amount: 100 * 100,
        currency: "INR",
        name: "gaushala",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: orderId,
        handler: (res) => {
          console.log(res);
          if (res && res.razorpay_payment_id) {
           
          //  if success
          capture(res.razorpay_payment_id,10000)
          }
        },
        prefill: {
          name: "client name",
          email: "client@gail.com",
          contact: "9371663528",
        },
        notes: {
          address: "Gaushala Office",
          
        },
        theme: {
          color: "#2E7D32",
        },
      };
  
      const rzpay = new Razorpay(options);
      rzpay.open();
    }, [Razorpay]);
  
             
  


    return<>


<div style={{display:"flex",justifyContent:"center",alignContent:"center",}}>
      <button style={{padding:"10px 20px", backgroundColor:"orange",borderRadius:20,}} onClick={handlePayment}>Donate</button>
    </div>
    </>}

    export default Payment;