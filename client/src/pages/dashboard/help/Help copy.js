import React from 'react';
import './help.css';
import './MotorInfo.css';
import screenshot7 from './screenshots/Screenshot7.png';
import screenshot6 from './screenshots/Screenshot6.png';
import screenshot8 from './screenshots/Screenshot8.png';
import screenshot9 from './screenshots/Screenshot9.png';
import screenshot10 from './screenshots/Screenshot10.png';
import Img from 'react-image';

const Help = () => {
  return (
    <div className="motor-info">
      <div className="title">
        <h1>Squirrel Cage Induction Motors (SCIM)</h1>
      </div>
      <p>
        Squirrel Cage Induction Motors (SCIM) are used for electro-mechanical
        energy conversions in many industries such as rolling mills, power
        plants, steel industries, locomotives, electric vehicles, etc.
      </p>
      <h1>Causes and Identification of Faults</h1>
      <h2 className="subheading">CAUSES</h2>
      <p className="content">
        The causes of the faults can be attributed mainly due to the hotspot
        formation and presence of the uneven magnetic pull. The hotspot
        formation and the presence of the uneven magnetic pull may result from
        insulation degradation, non-uniform loading patterns, installation
        defects, manufacturing defects, etc.
      </p>
      <h2 className="subheading">IDENTIFICATION</h2>
      <p className="content">
        Each fault of SCIM induces few fault frequency components in the
        armature current and the vibration signal spectrum. In most of the
        cases, those frequency components are used to identify the fault types.
      </p>
      <h1>Types of Faults</h1>
      <h2 className="subheading">
        Broken Rotor Bar (BRB) and Broken End Ring (BER) faults
      </h2>
      <p className="content">
        Single or multiple rotor bars or the end ring may break because of the
        uneven magnetic pull. The most likely locations of the breakage are the
        joints between the end ring and the rotor bars.
      </p>
      <Img
        src={screenshot6}
        alt="Screenshot 6"
        width={400}
        height={300}
      />
      <p>
        The presence of Broken Rotor Bar (BRB) and Broken End Ring (BER) faults
        in traction motors induces specific fault frequencies in the armature
        current and vibration spectra. These fault frequencies are critical for
        diagnosing motor health. In the armature current spectrum, BRB faults
        induce frequency components expressed by: <br />
        <div className="highlight-box">
          {" "}
          f<sub>brb1</sub> = (1 ± 2k<sub>1</sub>s)f<sub>s</sub>, k<sub>1</sub> =
          1, 2, 3, ...{" "}
        </div>
        <br />
        The negative sign components result directly from asymmetry, causing
        torque ripple, while positive sign components arise indirectly. <br />
        Additionally, BRB faults manifest as <br />
        <div className="highlight-box">
          {" "}
          f<sub>brb2</sub> = [(k<sub>2</sub>/p)(1 − s) ± s]f<sub>s</sub>, k
          <sub>2</sub>/p = 1, 2, 3, ...
        </div>{" "}
        <br /> and <br />{" "}
        <div className="highlight-box">
          f<sub>brb3</sub> = (7 − 8s)f<sub>s</sub>
        </div>{" "}
        <br /> especially detectable under pulsating load conditions using space
        harmonic components. In the vibration spectrum, BRB and BER faults
        exhibit frequencies represented by
        <br />{" "}
        <div className="highlight-box">
          {" "}
          f
          <sub>
            v<sub>brb1</sub>
          </sub>{" "}
          = f<sub>r</sub> ± kf<sub>p</sub>, k = 0, 1
        </div>
        <br /> ​where f<sub>p</sub> = 2p<sub>p</sub>(f<sub>sync</sub> − f
        <sub>r</sub>), f<sub>sync</sub> = f<sub>s</sub>, f<sub>r</sub> denotes
        rotational frequency, and p<sub>p</sub> is the number of pole pairs.
        Notably, the power of the rotational frequency component increases
        during BRB or BER faults, making it distinguishable.
        <br /> Under light loading conditions, frequencies
        <br />
        <div className="highlight-box">
          f
          <sub>
            v<sub>brb2</sub>
          </sub>{" "}
          = f<sub>t</sub> ± 2kf<sub>s</sub>
        </div>
        <br /> and <br />{" "}
        <div className="highlight-box">
          f<sub>t</sub> = f<sub>r</sub>N<sub>R</sub>
        </div>{" "}
        <br /> are employed, with N<sub>R</sub> representing the number of rotor
        bars and k = 1, 2, 3, ... . These fault frequencies play a crucial role
        in diagnosing BRB and BER faults, especially in traction motors, aiding
        in the maintenance and reliability of electrical systems.
        <br />
      </p>
      <br />
      <h2 className="subheading">Eccentricity faults</h2>
      <p className="content">
        In the presence of eccentricity fault, the air-gap between the rotor and
        stator of the SCIM does not remain uniform along the stator inner
        periphery. Eccentricity faults can be of three type, static, dynamic and
        mixed eccentricity
      </p>
      <Img
        src={screenshot7}
        alt="Screenshot 7"
        width={700}
        height={300}
      />
      <h3 className="subheading2">1. Static eccentricity:</h3>
      <p className="content">
        In the case of static eccentricity fault, the axis of rotation and the
        rotor axis coincide with each other, but they are different from the
        stator axis. The axis mismatch creates a non-uniform air-gap profile
        along the stator inner periphery, but the profile does not change with
        the rotor rotation.
      </p>
      <br />
      <h3 className="subheading2">2. Dynamic eccentricity:</h3>
      <p className="content">
        In the case of dynamic eccentricity, the stator axis and the axis of
        rotation coincide with each other, but they are different from the rotor
        axis. Therefore, under the dynamic eccentricity condition, the minimum
        air-gap location rotates with the rotation of the rotor.
      </p>
      <br />
      <h3 className="subheading2">3. Mixed eccentricity:</h3>
      <p className="content">
        Under all practical circumstances, the static and the dynamic
        eccentricities exist together for a machine, and such condition is
        called mixed eccentricity. In the case of mixed eccentricity, all the
        three axes, stator axis, rotor axis and the axis of rotation are
        different from each other.
      </p>

      <p className="content">
        The unbalance created in the magnetic and electric circuits of the SCIM
        due to the eccentricity faults induces fault related frequency
        components in the armature current and vibration signal spectrum. The
        fault frequencies appearing in the armature current signal are as
        follows: <br />
        <div className="highlight-box">
          {" "}
          f<sub>ecc1</sub> =[(kN<sub>R</sub> ± n<sub>d</sub>)((1 - s)/(p
          <sub>p</sub>)± v]f<sub>s</sub>, k = 1, 2, 3, ··· and v = 1, 3, 5, ···{" "}
        </div>
        <br />
        where n<sub>d</sub> = 0 for the static eccentricity and n<sub>d</sub> =
        1, 2, 3, ··· for the dynamic eccentricity.
        <br />
        <br />
        In the case of the mixed eccentricity, the following frequencies are
        also observed in the motor current spectrum: <br />
        <div className="highlight-box">
          f<sub>ecc2</sub> = [(1 - s)/p<sub>p</sub>± k]fs, k = 1, 2, 3, ···
        </div>
        <br />
        The following mixed eccentricity frequency components in the vibration
        signal spectrum are used to detect eccentricity faults: <br />
        <div className="highlight-box">
          f
          <sub>
            v<sub>ecc1</sub>
          </sub>{" "}
          = f<sub>s</sub> |1 ± kf<sub>r</sub>| , k = 1, 2, 3, ···
        </div>
      </p>
      <h2 className="subheading">Bearing faults</h2>
      <p className="content">
        Bearing consists of three major parts: inner ring, outer ring and
        rolling elements. Rolling elements can have shapes like balls,
        cylinders, tapered cylinders, etc.
      </p>
      <Img
        src={screenshot8}
        alt="Screenshot 8"
        width={400}
        height={300}
      />
      <p className="content">
        Due to fatigue, corrosion, improper lubrication,installation defects,
        etc., small parts of the bearings may break loose.
        <br />
        Depending on the location of the brokage, the bearing faults can be of
        three types, inner raceway, outer raceway and rolling element faults.
        <br />
        <Img
          src={screenshot9}
          alt="Screenshot 9"
          width={800}
          height={300}
        />
        <br />
        The effect of the bearing faults is more prominent in the motor
        vibration signal than the armature current signal.The fault frequencies
        observed in the motor vibration signal are as follows:
        <br />
        1. Inner raceway fault :
        <div className="highlight-box">
          {" "}
          f
          <sub>
            v<sub>inner</sub>
          </sub>{" "}
          = N<sub>b</sub>/2f<sub>r</sub>[1 + (b<sub>d</sub> (cos(β<sub>c</sub>
          ))/d<sub>ρ</sub>]
        </div>
        <br />
        2. Outer raceway fault :
        <div className="highlight-box">
          {" "}
          f
          <sub>
            v<sub>outer</sub>
          </sub>{" "}
          = N<sub>b</sub>/2f<sub>r</sub>[1 - (b<sub>d</sub> (cos(β<sub>c</sub>
          ))/d<sub>ρ</sub>]
        </div>
        <br />
        3. Rolling element fault :
        <div className="highlight-box">
          {" "}
          f
          <sub>
            v<sub>rolling</sub>
          </sub>{" "}
          = d<sub>ρ</sub>f<sub>r</sub>/b<sub>d</sub>[1 - (b<sub>d</sub> (cos(β
          <sub>c</sub>)/d<sub>ρ</sub>))<sup>2</sup>]
        </div>
        <br />
        where N<sub>b</sub> is the number of rolling elements, b<sub>d</sub> is
        the rolling element diameter, d<sub>p</sub> is the pitch diameter and βc
        is the contact angle between the rolling element and the inner or outer
        raceway.
        <br />
        The vibration fault frequencies get reflected in the motor armature
        current spectrum as follows:
        <br />
        <div className="highlight-box">
          f<sub>bb</sub> = f<sub>s</sub> ± kf<sub>v</sub>, k = 1, 2, 3, ···
        </div>
        <br />
        where f<sub>v</sub> is f
        <sub>
          v<sub>inner</sub>
        </sub>
        , f
        <sub>
          v<sub>outer</sub>
        </sub>{" "}
        or f
        <sub>
          v<sub>rolling</sub>
        </sub>
        .
      </p>
      <h1>A general SCIM fault detection framework</h1>
      <Img
        src={screenshot10}
        alt="Screenshot 10"
        width={500}
        height={400}
      />
      <p>
        The necessary steps in any SCIM fault detection system are as follows:
        <br />
        <br />
        <strong>1. Signal measurement:</strong> Motor voltage, current,
        vibration, temperature, search coil voltage, etc. are the standard
        signals used for SCIM fault detection. Depending on the method, either
        one of them or a combination of those signals are used.
        <br />
        <br />
        <strong>2. Prefiltering and A/D conversion:</strong> The acquired
        signals are then converted into digital form for further processing.
        Before A/D conversion a low pass analog filter is used as an
        antialiasing filter. The cutoff frequency of the filter depends on the
        type of the signal used. The cutoff frequency of 1 kHz and sampling
        frequency of 2 kHz is sufficient for the armature current signal.
        <br />
        <br />
        <strong>3. Signal processing and feature extraction:</strong> There are
        several algorithms used for processing the digital signal. Fast Fourier
        Transform (FFT), Power Spectral Density (PSD), MUltiple SIgnal
        Classifier (MUSIC), Wavelet decomposition, Wigner-Ville Decomposition
        (WVD), Empirical Mode Decomposition (EMD), etc. are few such algorithms.
        In most of the methods, amplitudes at various fault frequencies are
        extracted from the signal spectrum.
        <br />
        <br />
        <strong>4. Pattern matching and decision making:</strong> Simple
        thresholding to various machine learning approaches such as Artificial
        Neural Network (ANN), Support Vector Machine (SVM), etc. are used to
        differentiate the faulty motors from the healthy ones.
        <br />
      </p>
    </div>
  );
}

export default Help;
