import React from 'react';
import './Certificate.css'; // Create a separate CSS file for styling if needed

const Certificate = () => {
  return (
    <div className='Certificate'>
      <div className="certificate-container">
     
     <div className="certificate-title">Certificate of Donation</div>
     <div className="donor-name">Presented to: [Donor Name]</div>
     <div className="certificate-message">
       In appreciation of your generous donation to [Goshala Name], we hereby acknowledge your support and contribution to our noble cause.
     </div>
     <div className="date">Date: [Date]</div>
   </div>
    </div>
    
  );
};

export default Certificate;
