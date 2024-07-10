import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Import useState and useEffect
import links from '../utils/links';

const NavLinks = ({ toggleSidebar}) => {
  const [userType, setUserType] = useState('');
  const location = useLocation();

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



  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, id, icon } = link;

        // Conditionally render the link based on userType
        if (userType === 'User' && text === 'Add Motor') {
          return null; // Don't render the link
        }

        // Check if the current path matches '/all-jobs'
        const isActive = location.pathname.startsWith('/list-of-motors');
  
        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={`nav-link ${isActive && text === 'List of Motors' ? 'active' : ''}`}
            end
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
