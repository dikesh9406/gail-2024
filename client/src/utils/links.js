import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms, FaInfoCircle, FaQuestionCircle } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

const links = [
  { id: 1, text: 'Dashboard', path: '/', icon: <IoBarChartSharp /> },
  { id: 2, text: 'List of Motors', path: '/list-of-motors', icon: <MdQueryStats /> },
  { id: 3, text: 'Add Motor', path: 'add-motor', icon: <FaWpforms /> },
  { id: 4, text: 'Profile', path: 'profile', icon: <ImProfile /> },
  { id: 5, text: 'About us', path: 'about-us', icon: <FaInfoCircle /> },
  { id: 6, text: 'Help Section', path: 'help', icon: <FaQuestionCircle /> },
];

export default links;
