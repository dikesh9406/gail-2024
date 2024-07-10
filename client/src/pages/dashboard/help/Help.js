import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import s1 from '../../../assets/images/1.png';
import s2 from '../../../assets/images/2.png';
import s3 from '../../../assets/images/3.png';
import s4 from '../../../assets/images/4.png';
import s5 from '../../../assets/images/5.png';
import s6 from '../../../assets/images/6.png';
import s7 from '../../../assets/images/7.png';
import s9 from '../../../assets/images/9.png';

import a from './screenshots/a.png'
import b from './screenshots/b.png'
import c from './screenshots/c.png'
import d from './screenshots/d.png'
import e from './screenshots/e.png'
import f from './screenshots/f.png'
import g from './screenshots/g.png'
import h from './screenshots/h.png'
import i from './screenshots/i.png'
import j from './screenshots/j.png'
import k from './screenshots/k.png'


import './help.css';
import './MotorInfo.css';
import screenshot7 from './screenshots/Screenshot7.png';
import ss18 from './screenshots/ss18.png';
import ss21 from './screenshots/ss21.png';
import ss24 from './screenshots/ss24.png';



import screenshot16 from './screenshots/Screenshot16.png';
import screenshot17 from './screenshots/Screenshot17.png';
import screenshot8 from './screenshots/Screenshot8.png';
import screenshot9 from './screenshots/Screenshot9.png';
import screenshot10 from './screenshots/Screenshot10.png';
import { Img } from 'react-image';
import { FaBold } from 'react-icons/fa';
const Wrapper = styled(Container)({
    paddingTop: '2em',
});

const Help = () => {
    return (
        <>
            <Wrapper>
                <Grid container spacing={2}>
                    <Grid item xs={12} align="center">
                        <Typography variant="h4" color="primary">
                            Help Section
                        </Typography>
                    </Grid>


                    <Grid item xs={12}>

                        <div className="text-section">
                        <Typography variant="h3" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em', fontWeight:"bold"}}>
                                Website Overview
                            </Typography>
                            <Typography variant="h6" sx={{ overflow: 'hidden', marginTop: '1em' }}>
                                <img src={a} alt="Approaches to estimate RUL" style={{ maxWidth: '100%', display: 'flex', justifySelf: 'center', alignContent: 'center' }} />
                            </Typography>
                            <Typography variant="h6" sx={{ overflow: 'hidden', marginTop: '1em' }}>
                                <img src={b} alt="Approaches to estimate RUL" style={{ maxWidth: '100%', display: 'flex', justifySelf: 'center', alignContent: 'center' }} />
                            </Typography><Typography variant="h6" sx={{ overflow: 'hidden', marginTop: '1em' }}>
                                <img src={c} alt="Approaches to estimate RUL" style={{ maxWidth: '100%', display: 'flex', justifySelf: 'center', alignContent: 'center' }} />
                            </Typography><Typography variant="h6" sx={{ overflow: 'hidden', marginTop: '1em' }}>
                                <img src={d} alt="Approaches to estimate RUL" style={{ maxWidth: '100%', display: 'flex', justifySelf: 'center', alignContent: 'center' }} />
                            </Typography><Typography variant="h6" sx={{ overflow: 'hidden', marginTop: '1em' }}>
                                <img src={e} alt="Approaches to estimate RUL" style={{ maxWidth: '100%', display: 'flex', justifySelf: 'center', alignContent: 'center' }} />
                            </Typography><Typography variant="h6" sx={{ overflow: 'hidden', marginTop: '1em' }}>
                                <img src={f} alt="Approaches to estimate RUL" style={{ maxWidth: '100%', display: 'flex', justifySelf: 'center', alignContent: 'center' }} />
                            </Typography><Typography variant="h6" sx={{ overflow: 'hidden', marginTop: '1em' }}>
                                <img src={g} alt="Approaches to estimate RUL" style={{ maxWidth: '100%', display: 'flex', justifySelf: 'center', alignContent: 'center' }} />
                            </Typography><Typography variant="h6" sx={{ overflow: 'hidden', marginTop: '1em' }}>
                                <img src={h} alt="Approaches to estimate RUL" style={{ maxWidth: '100%', display: 'flex', justifySelf: 'center', alignContent: 'center' }} />
                            </Typography><Typography variant="h6" sx={{ overflow: 'hidden', marginTop: '1em' }}>
                                <img src={i} alt="Approaches to estimate RUL" style={{ maxWidth: '100%', display: 'flex', justifySelf: 'center', alignContent: 'center' }} />
                            </Typography>
                            <Typography variant="h3" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em', fontWeight:"bold" }}>
                                Theoretical Foundation
                            </Typography>
                            <Typography variant="h4" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                Introduction to Fault Types
                            </Typography>
                            <Typography variant="h6" sx={{ overflow: 'hidden', textAlign: 'justify' }}>

                                <p className="content">
                                    Squirrel Cage Induction Motors (SCIMs) are the primary motive force provider for any industry and railway transportation. The prevalent maintenance practice of SCIMs in most industries is based on periodic supervision and servicing. Periodic maintenance results in unnecessary expenses and operating equipment and components for suboptimal periods. In the worst case scenario, a component may get completely damaged before the time for its next scheduled maintenance arrive. The SCIM faults in their inception are incipient in nature. As a result, the effect of the fault does not affect the operations drastically. However, the sustained activity under incipient defects can lead to severe damage and abrupt stoppage of the operations. A way out to obviate from the periodic maintenance is by shifting to condition-based maintenance that would require the detection of incipient faults at an earlier stage. A diagnostic module with preemptive fault detection features is a critical and prudent necessity for condition monitoring of SCIMs. This module can improve the reliability and integrity of the SCIMs and aid in avoiding unwarranted downtime. The advantages offered by AC drives and induction motors have changed the scenario with Indian Railways adopting AC induction motors in a big way. A locomotive engine employs a variety of SCIMs for operations ranging from providing tractive power to cooling and keeping the locomotive dust-free. Due to restricted availability of space in the locomotives, redundancies are nonexistent. Because of this, any outage of any of the machine drastically reduces the capability of the locomotive and can even completely disable it. Faults in the bearings, rotors and electrical faults like winding short circuit, occurring in the motors drastically affects the locomotive performance. It, therefore, becomes necessary to have monitoring systems of the motors available in a locomotive that would be able to diagnose the health and fault levels of the motors.
                                </p>
                                <p className="content">
                                    Condition monitoring of inductor motor requires an extensive study of the different types of faults and the available detection methodologies. A fault is defined as the an unpermitted deviation of at least one characteristic property of the system from the acceptable, usual and standard condition [1]. Faults are incipient in nature, so even if there is a fault in the system, the system may operate as a normal system with subtle deviation in its states. Fault diagnosis consists of three different steps, 1. Fault detection, 2. Fault Isolation - localization or classification of the fault, and 3. Fault identification - determination of type, magnitude and cause of the fault. Failure is defined as the permanent interruption of the system’s ability to perform the required functions, [1]. If faults are not detected and proper maintenance has not been taken, the faulty system leads to complete failure resulting in loss of productivity. Failure prognosis consists of early detection of incipient faults and predicting the remaining useful life before failure. In this research, an onboard and embedded condition monitoring system for SCIMs is envisioned for improving their reliability and reducing their cost of maintenance. The primary research issue is related to the detection of weak and incipient faults under various load conditions when the fault signatures are difficult to detect. The other areas are related to selection and placement of sensors, proper signal conditioning, detection of multiple combined defects, efficient online implementations, etc.
                                </p>

                                <p className="content">
                                    aults in SCIMs can be broadly classified into rotor faults, stator faults, and bearing faults. Each fault class can further be subclassified as given below
                                </p>
                            </Typography>

                            <Typography variant="h6" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '0' }}>

                                Rotor Faults:

                                <div style={{ marginLeft: '30px' }}>
                                    <li>Broken Rotor Bar</li>
                                    <li>Broken End Ring</li>
                                    <li>Eccentricity Fault  </li>
                                </div>
                                <div style={{ marginLeft: '60px' }}>

                                    <li>Static Eccentricity</li>
                                    <li>Dynamic Eccentricity</li>
                                    <li>Mixed Eccentricity</li>
                                </div>
                                <div style={{ marginLeft: '0' }}>
                                    Bearing Faults:
                                </div>
                                <div style={{ marginLeft: '30px' }}>
                                    <li>Inner Raceway Fault</li>
                                    <li>Outer Raceway Fault</li>
                                    <li>Rolling Element Fault</li>
                                </div>
                                <div style={{ marginLeft: '0' }}>
                                    Stator Faults:
                                </div>
                                <div style={{ marginLeft: '30px' }}>
                                    <li>Inter turn short circuit</li>
                                </div>
                                <div style={{ marginLeft: '0' }}>
                                    Foundational Looseness:
                                </div> <div style={{ marginLeft: '0' }}>
                                    Misalignment Fault:
                                </div>




                            </Typography>
                            <Typography variant="h6" sx={{ overflow: 'hidden', textAlign: 'justify' }}>

                                <p className="content">
                                    Fault diagnosis requires detailed modelling of the motor during healthy as well as faulty conditions. The literature on analysis of induction motors is rich and extensive. However, suitable models to analyze the transient behaviour involving multiple internal fault conditions within the motor itself are not yet fully developed.  The research in this direction is limited to only the last 15 years, even though SCIMs have been in operation for a century. Fortunately, the last decade has seen a growth in computing power enabling the design and testing of some of the newer as well as some prior existing numerical methods for dynamic modelling and signal analysis. This enabled the development of algorithms for accurate diagnosis of faults in electrical machines. In this thesis, broken rotor bar and air gap eccentricity, which account for about 50-60% of all induction motor failures, are considered for modelling and diagnosis [32].
                                </p>
                            </Typography>

                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                1.1 SCIM Faults
                            </Typography>
                            <Typography variant="h6" sx={{ overflow: 'hidden', textAlign: 'justify' }}>

                                <p className="content">Depending on the fault location, the SCIM faults are divided into the following four
                                    groups. Each fault of SCIM induces few fault frequency components in the armature current and the vibration signal spectrum. In most of the cases, those frequency components are used to identify the fault types.</p>

                            </Typography>

                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                1.1.1   Broken Rotor Bar (BRB) and Broken End Ring (BER) faults
                            </Typography>
                            <Typography variant="h6" sx={{ overflow: 'hidden', textAlign: 'justify' }}>

                                <p className="content">ingle or multiple rotor bars or the end ring may break because of the uneven magnetic pull. The most likely locations of the breakage are the joints between the end ring and the rotor bars. A photograph of a 22kW motor is shown in Fig. 1.1 where the rotor bar is broken at the joint [10]. The BRB and the BER faults create asymmetry in the electrical and magnetic circuits of the motor which induces the following fault specific frequencies in the armature current spectrum [1].</p>

                            </Typography>

                            <div >
                                <Img
                                    src={screenshot16}
                                    alt="Screenshot 6"
                                    width={400}
                                    height={300}
                                />
                                <Img
                                    src={screenshot17}
                                    alt="Screenshot 6"
                                    width={400}
                                    height={300}
                                />
                            </div>
                            <Typography variant="h6" sx={{ overflow: 'hidden', textAlign: 'justify' }}>

                                <p class="center-text">Figure 1.1: Photographs of BRB and BER faults [10].</p>
                                <p class="center-text">fbrb1 = (1 ± 2ks) fs, k = 1, 2, 3, ...                        (1.1)</p>

                                <p className="content">
                                    where fs is the fundamental supply frequency and s is the slip of the motor. The frequency components associated with k1 = 1 are the most prominent [11]. The fault frequency components related to the -ve sign appear due to the direct effect of the asymmetry created by BRB and BER. Those components cause torque ripple at frequencies 2k1sfs which in turn induce the fault frequency components associated with the +ve sign [12]. The following frequency components are also observed in the armature current spectrum of SCIM with BRB or BER fault [1].
                                </p>
                            </Typography>

                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                1.1.2 Eccentricity faults
                            </Typography>

                            <Typography variant="h6" sx={{ overflow: 'hidden', textAlign: 'justify' }}>

                                <p className="content">
                                    In the presence of eccentricity fault, the air-gap between the rotor and stator of the SCIM does not remain uniform along the stator inner periphery. Eccentricity faults can be of three type, static, dynamic and mixed eccentricity [1]. The schematic diagrams of each type of eccentricity faults are shown in Fig. 1.2. The unbalance created in the magnetic and electric circuits of the SCIM due to the eccentricity faults induces fault related frequency components in the armature current signal spectrum.

                                </p>
                                <div class="image-container ">
                                    <Img
                                        src={ss18}
                                        alt="Screenshot 6"
                                        width={700}
                                        height={300}
                                    />

                                </div>
                                <p className="center-text">Figure 1.2: Schematics of various eccentricity faults. (a) Static, (b) Dynamic</p>


                                <p className="content"><h5>1. Static eccentricity:</h5>In the case of static eccentricity fault, the axis of rotation and the rotor axis coincide with each other, but they are different from the stator axis. The axis mismatch creates a non-uniform air-gap profile along the stator inner periphery, but the profile does not change with the rotor rotation.</p>

                                <p className="content"><h5>2. Dynamic eccentricity: </h5>In the case of dynamic eccentricity, the stator axis and the axis of rotation coincide with each other, but they are different from the rotor axis. Therefore, under the dynamic eccentricity condition, the minimum air-gap location rotates with the rotation of the rotor</p>
                                <p className="content"><h5>3. Mixed eccentricity: </h5>Under all practical circumstances, the static and the dynamic eccentricities exist together for a machine, and such condition is called mixed eccentricity [16]. In the case of mixed eccentricity, all the three axes, stator axis, rotor axis and the axis of rotation are different from each other.</p>
                            </Typography>

                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                1.1.3 Bearing faults
                            </Typography>

                            <Typography variant="h6" sx={{ overflow: 'hidden', textAlign: 'justify' }}>

                                <p className="content">Bearing consists of three major parts: inner ring, outer ring and rolling elements. Rolling elements can have shapes like balls, cylinders, tapered cylinders, etc. A schematic diagram of a bearing is shown in Fig. 1.3. Due to fatigue, corrosion, improper lubrication, installation defects, etc., small parts of the bearings may break loose [1].
                                    Depending on the location of the brokage, the bearing faults can be of three types, inner raceway,outer raceway and rolling element faults. </p>
                                <Img
                                    src={screenshot8}
                                    alt="Screenshot 8"
                                    width={400}
                                    height={300}
                                />
                                <Img
                                    src={screenshot9}
                                    alt="Screenshot 9"
                                    width={800}
                                    height={300}
                                />

                                <p className="content">The schematic illustrations of the three types of bearing faults are shown in Fig. 1.4. The effect of the bearing faults is more prominent in the motor vibration signal than the armature current signal.</p>
                            </Typography>
                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                1.1.4 Inter-turn short circuit fault
                            </Typography>
                            <Typography variant="h6" sx={{ overflow: 'hidden', textAlign: 'justify' }}>

                                <p className="content">
                                    Inter-turn Short Circuit (ITSC) occurs when a few turns from the same coil in the stator slot get short-circuited because of insulation degradation. The asymmetry in the magnetic field due to the ITSC fault induces the following fault frequencies in the armature current spectrum [1].

                                </p>     </Typography>
                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                1.1.5 Misalignment/Unbalance   </Typography>

                            <Typography variant="h6" sx={{ overflow: 'hidden', textAlign: 'justify' }}>
                                <p className="content">Misalignment occurs when the motor drive shaft is not in correct alignment with the load, or the component that couples the motor to the load is misaligned. There a few types of misalignment shown in Figure 1.5: -</p>
                                <p className="content"><h5> 1.Angular misalignment: </h5>shaft centerlines intersect but are not parallel</p>
                                <p className="content"><h5> 2.Parallel/offset misalignment: </h5> shaft centerlines are parallel but not concentric</p>
                                <p className="content"><h5> 3.Compound misalignment: </h5>The combination of parallel and angular misalignment. </p>

                                <Img
                                    src={ss21}
                                    alt="Screenshot 9"
                                    width={500}
                                    height={300}
                                />

                                <p className="center-text">Figure 1.5: Schematics of various misalignment faults. (a) angular, (b) parallel</p>

                            </Typography>
                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                1.1.6 foundation looseness   </Typography>


                            <Typography variant="h6" sx={{ overflow: 'hidden', textAlign: 'justify' }}>
                                <p className="content">Foundation looseness refers to a condition in which the mounting feet of a motor or driven component are not even, or the mounting surface upon which the mounting feet sit is not even.It is also known as Soft foot. Soft foot is often manifested between two diagonally positioned mounting bolts, similar to the way that an uneven chair or table tends to rock in a diagonal direction. There are two kinds of soft foot shown in the Figure 1.5: -</p>
                                <h4>   a. Parallel soft foot</h4>

                                <h4>           b. Angular soft foot</h4>


                                <Img
                                    src={ss24}
                                    alt="Screenshot 9"
                                    width={500}
                                    height={300}
                                />
            <p className="center-text">Figure 1.5: Schematics of various soft foot faults (a) parallel and (b) angular</p>

                            </Typography>
                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                            1.2 Literature Review   </Typography>

                            <Typography variant="h6" sx={{ overflow: 'hidden', textAlign: 'justify' }}>
                            <p className="content">The thesis deals with (a) Fault Modelling and (B) Fault Diagnosis. Accordingly, the literature on these two aspects is presented as follows.</p>

                            </Typography>

                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                            1.2.1 Fault Modelling   </Typography>


                            <Typography variant="h6" sx={{ overflow: 'hidden', textAlign: 'justify' }}>
                            <p className="content">Development of diagnostic procedures needs a detailed study of faulty behaviour of any system. In order to test the performance of fault diagnosis algorithms experimentally, faults have to be introduced and maintained in the motor which is difficult in practice. Therefore development of computation models that can simulate reliable system behaviour under faults is important to generate sufficient data for statistical testing and validation of the diagnostic procedures.</p>

                            </Typography>



                            <Typography variant="h4" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '2em' }}>
                                Introduction to RUL
                            </Typography>

                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify' , marginTop: '1em'}}>
                                Components Of Health Card
                            </Typography>
                            <Typography variant="h6" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>

                                <li>Fault type</li>
                                <li>Side band frequencies</li>
                                <li>Fault summary</li>
                                <li>Remaining useful life calculation</li>
                                <li>History of current & frequency for the period of 1 year</li>

                            </Typography>

                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                What is remaining useful life
                            </Typography>
                            <Typography variant="h6" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>

                                <li>The remaining useful life (RUL) of an asset or system is defined as the length from the current time to the end of the useful life.</li>
                                <li>RUL, also called remaining service life, residual life or remnant life, refers to the time left before observing a failure given the current machine age and condition, and the past operation profile.</li>
                                <li>Remaining useful life (RUL) is the length of time a machine is likely to operate before it requires repair or replacement.</li>

                            </Typography>

                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                Purpose of Using Current Data for Predicting RUL
                            </Typography>
                            <Typography variant="h6" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>

                                <li>Most used signal – vibration</li>
                                <li>Current signature can capture all the variability of vibration data</li>
                                <li>Health of insulation is dependent on heat</li>
                                <li>Heat is proportional to 𝐼²</li>
                                <li>Majority of degradation is captured through MCSA</li>

                            </Typography>

                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                Approaches to estimate RUL
                            </Typography>
                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                <img src={s1} alt="Approaches to estimate RUL" style={{ maxWidth: '100%', display: 'flex', justifySelf: 'center', alignContent: 'center' }} />

                            </Typography>
                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                Motor Faults
                            </Typography>
                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                <img src={s2} alt="Approaches to estimate RUL" style={{ maxWidth: '100%', display: 'flex', justifySelf: 'center', alignContent: 'center' }} />

                            </Typography>
                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                Major components of IM
                            </Typography>
                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                <img src={s3} alt="Approaches to estimate RUL" style={{ maxWidth: '100%', display: 'flex', justifySelf: 'center', alignContent: 'center' }} />

                            </Typography>

                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                Fault Characteristics
                            </Typography>
                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                <img src={s4} alt="Approaches to estimate RUL" style={{ maxWidth: '100%', display: 'flex', justifySelf: 'center', alignContent: 'center' }} />

                            </Typography>
                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                Assumption for Degradation model
                            </Typography>
                            <Typography variant="h6" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                <li>We have 3 different lifespans for 3 different components</li>
                                <li>Remaining Useful life of induction motor is:
                                    <p style={{ marginLeft: '50px', marginTop: '0', marginBottom: '0' }}>RUL(IM) = Min(RUL(rotor bar failure), RUL(Stator winding failure), RUL(Bearing failure))</p>
                                </li>
                                <li>Bearing life is very less compared to the lifespan of the other 2 components</li>

                            </Typography>
                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                Dataset Generation from Fault Model
                            </Typography>
                            <Typography variant="h6" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                <img src={s5} alt="Approaches to estimate RUL" style={{ maxWidth: '100%', display: 'flex', justifySelf: 'center', alignContent: 'center' }} />

                            </Typography>
                            <span style={{}}>
                                <span>
                                    <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>

                                        <h4>Time Domain Features</h4>
                                    </Typography>
                                    <Typography variant="h6" sx={{ overflow: 'hidden', textAlign: 'justify' }}>

                                        <li>Standard Deviation</li>
                                        <li>Skewness</li>
                                        <li>Kurtosis</li>
                                        <li>Peak to Peak</li>
                                        <li>RMS</li>
                                        <li>Crest Factor</li>
                                        <li>Shape Factor</li>
                                        <li>Impulse Factor</li>
                                        <li>Margin Factor</li>
                                        <li>Energy</li>
                                    </Typography>
                                </span>
                                <span>
                                    <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>

                                        <h4>Spectral Domain Features</h4>
                                    </Typography>
                                    <Typography variant="h6" sx={{ overflow: 'hidden', textAlign: 'justify' }}>

                                        <li>Spectral Domain Kurtosis</li>
                                        <li>Total Harmonic Distortion (THD)</li>
                                        <li>Power Spectral Density Mean</li>
                                        <li>Spectral Domain Skewness</li>
                                    </Typography>
                                </span>
                            </span>
                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                Computation of Health Index(Output)  </Typography>


                            <Typography variant="h6" sx={{ overflow: 'hidden', marginTop: '1em' }}>
                                <li>HI can be any function which is monotonically increasing/decreasing with the propagation of fault severity</li>
                                <li>We considered severity as normalized sideband frequency amplitude.</li>
                                <li>Normalization is done using fundamental frequency amplitude.</li>
                            </Typography>
                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                Model Training & update
                            </Typography>


                            <Typography variant="h6" sx={{ overflow: 'hidden', marginTop: '1em' }}>
                                <img src={s6} alt="Approaches to estimate RUL" style={{ maxWidth: '100%', display: 'flex', justifySelf: 'center', alignContent: 'center' }} />
                            </Typography>
                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                Structure of Trained Model
                            </Typography>


                            <Typography variant="h6" sx={{ overflow: 'hidden', marginTop: '1em' }}>
                                <img src={s7} alt="Approaches to estimate RUL" style={{ maxWidth: '100%', display: 'flex', justifySelf: 'center', alignContent: 'center' }} />
                            </Typography>
                            <Typography variant="h5" sx={{ overflow: 'hidden', textAlign: 'justify', marginTop: '1em' }}>
                                Prediction of RUL
                            </Typography>


                            <Typography variant="h6" sx={{ overflow: 'hidden', marginTop: '1em' }}>
                                <img src={s9} alt="Approaches to estimate RUL" style={{ maxWidth: '100%', display: 'flex', justifySelf: 'center', alignContent: 'center' }} />
                            </Typography>








                            {/* Remove duplicate headings */}
                        </div>
                    </Grid>
                </Grid>
            </Wrapper>
        </>
    );
};

export default Help;
