import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HealthCard from './pages/healthCard/healthCard';
import { Register, Landing, Error, ProtectedRoute } from './pages';
import { useAppContext } from './context/appContext.js'
import ForgotPassword from "./pages/ForgotPassword.js";
import Charts from './pages//charts/displayCharts2.js'
import {
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
  AddJob,
  About_us,
  Stats_admin,

} from './pages/dashboard';
import Help from "./pages/dashboard/help/Help.js"
import displayCharts2 from './pages//charts/displayCharts2.js';
import ScrollToTop from './components/ScrollToTop.js';


function App({ userType }) {
  const { user } = useAppContext()

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats_admin />} />
          <Route path='list-of-motors' element={<AllJobs />} />
          <Route path='add-motor' element={<AddJob />}></Route>
          <Route path="/list-of-motors/historicalGraph" element={<Charts></Charts>} />

          <Route path="/list-of-motors/healthcard/:motorId" element={<HealthCard />} />

          <Route path='profile' element={<Profile />} />
          <Route path='about-us' element={<About_us />} />
          <Route path='help' element={<Help />} /> 
          
          </Route>


        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path="forgot-password" element={<ForgotPassword></ForgotPassword>} />

        <Route path='/' element={<Landing />} />

        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
