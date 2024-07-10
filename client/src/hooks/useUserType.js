// src/hooks/useUserType.js
import { useState, useEffect } from 'react';

const useUserType = () => {
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

  return userType;
};

export default useUserType;
