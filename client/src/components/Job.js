import moment from 'moment'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'
import React, { useState, useEffect } from 'react';

const Job = ({
  _id,
  company,
  position,
  status,
  jobType,
  jobLocation,
  createdBy,
  createdAt,
  Manufacturer
}) => {
  const { setEditJob, deleteJob } = useAppContext()

  let date = moment(createdAt);
  date = date.format('MMM Do, YYYY, h:mm A'); // For 12-hour format with AM/PM
 
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

 
  if (userType === 'Admin') 
 {
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{company}</h5>
          <p>{position}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={Manufacturer} />
          <div className={`jobType ${jobType}`}>{jobType}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-motor'
              className='btn edit-btn'
              onClick={() => setEditJob(_id)}
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteJob(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
 }
 else{
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{company}</h5>
          <p>{position}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={Manufacturer} />
          <div className={`jobType ${jobType}`}>{jobType}</div>
        </div>
        <footer>
          <div className='actions'>
            {/* <Link
              to='/add-job'
              className='btn edit-btn'
              onClick={() => setEditJob(_id)}
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteJob(_id)}
            >
              Delete
            </button> */}
          </div>
        </footer>
      </div>
    </Wrapper>
  )
 }
}

export default Job
