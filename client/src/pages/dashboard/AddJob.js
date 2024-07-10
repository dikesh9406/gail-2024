import React, { useState, useEffect } from 'react';

import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import axios from 'axios';

const Addjob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    Manufacturer,
    Disign_Life,
    Power_Rating, Voltage, Current, Frequency, Speed,No_of_poles,

    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    axios.get('http://www.qts.iitkgp.ac.in/last/gail/current/fault/1')
      .then(response => {
        setDatas(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  useEffect(() => {
    if (datas.length > 0) {
      const firstData = datas[0];
     
      const fault = firstData.fault;
  
      // Check fault status and update jobType based on the first item
      let newJobType = 'Unknown';
      if (fault === 'N/A') {
        newJobType = 'Not Working';
      } else if (fault === 'Healthy') {
        newJobType = 'Working';
      } else {
        newJobType = 'Faulty';
      }
  
      handleChange({ name: 'status', value: newJobType });
      
    }
  }, [datas, handleChange]);
  

  const [userType, setUserType] = useState('');
  useEffect(() => {
    fetch('/api/v1/auth/getCurrentUser')
      .then(response => response.json())
      .then(data => {
        setUserType(data.user.userType);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editJob();
      return;
    }
    createJob();
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };
  if (userType === 'Admin') {
  return (
<>
<div style={{textAlign:"center", width:"100%"}}>
    <h3 style={{color:"#3f51b5"}}>
    <h3>{isEditing ? "Edit Motor" : "Add Motor"}</h3>
    </h3>
</div>
<Wrapper>
       
      <form className="form" onSubmit={handleSubmit}>
        
  
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="company"
            labelText="Motor Name"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="position"
            labelText="Manufacturer"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            labelText="location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* <FormRowSelect
            name="status"
            labelText="Motor Status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          /> */}
          <FormRowSelect
            name="jobType"
            labelText="Motor Type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
                    {/* <FormRow
            type="text"
            labelText="Manufacturer"
            name="Manufacturer"
            value={Manufacturer}
            handleChange={handleJobInput}
          /> */}
                    <FormRow
            type="text"
            labelText="Disign Life (years)"
            name="Disign_Life"
            value={Disign_Life}
            handleChange={handleJobInput}
          />
              <FormRow
            type="text"
            labelText="Power Rating (KW)"
            name="Power_Rating"
            value={Power_Rating}
            handleChange={handleJobInput}
          />
              <FormRow
            type="text"
            labelText="Rated Voltage (V)"
            name="Voltage"
            value={Voltage}
            handleChange={handleJobInput}
          />
                   <FormRow
            type="text"
            labelText="Rated Current (A)"
            name="Current"
            value={Current}
            handleChange={handleJobInput}
          />
               <FormRow
            type="text"
            labelText="Rated Frequency (Hz)"
            name="Frequency"
            value={Frequency}
            handleChange={handleJobInput}
          />     <FormRow
          type="text"
          labelText="Speed (rpm)"
          name="Speed"
          value={Speed}
          handleChange={handleJobInput}
        />
          <FormRow
          type="text"
          labelText="No of poles"
          name="No_of_poles"
          value={No_of_poles}
          handleChange={handleJobInput}
        />

          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              disabled={isLoading}
            >
              submit
            </button>
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
</>
  );
}
else
{
  console.log('Only admin can access this page');
  return (<h1>Only admin can access this page</h1>)
}
};

export default Addjob;
