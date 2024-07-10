import React from 'react';
import gail from '../assets/images/gail.png';

const Logo2 = () => {
  return (
    <div style={{ marginTop: '10px' , marginLeft:'5px'}}> {/* Added marginTop */}
      <img
        src={gail}
        alt="jobify"
        className="logo"
        style={{ width: '65px', height: '65px', marginLeft: 'auto' }}
      />
    </div>
  );
};

export default Logo2;
