import React from 'react';

const HealthCard = () => {
  return (
    <div>
      <div>
        <h2>Components Of Health Card</h2>
        <ul>
          <li>Fault type</li>
          <li>Side band frequencies</li>
          <li>Fault summary</li>
          <li>Remaining useful life calculation</li>
          <li>History of current & frequency for the period of 1 year</li>
        </ul>
      </div>
      
      <div>
        <h2>What is remaining useful life</h2>
        <p>The remaining useful life (RUL) of an asset or system is defined as the length from the current time to the end of the useful life.</p>
        <p>RUL, also called remaining service life, residual life or remnant life, refers to the time left before observing a failure given the current machine age and condition, and the past operation profile.</p>
        <p>Remaining useful life (RUL) is the length of time a machine is likely to operate before it requires repair or replacement.</p>
      </div>
      
      <div>
        <h2>Purpose of Using Current Data for Predicting RUL</h2>
        <ul>
          <li>Most used signal – vibration</li>
          <li>Current signature can capture all the variability of vibration data</li>
          <li>Health of insulation is dependent on heat</li>
          <li>Heat is proportional to 𝐼²</li>
          <li>Majority of degradation is captured through MCSA</li>
        </ul>
      </div>
      
      <div>
        <h2>Approaches to estimate RUL</h2>
        <p>RUL:</p>
        <ul>
          <li>Physics Based Modelling</li>
          <li>Data Driven Modelling
            <ul>
              <li>Statistics Based</li>
              <li>AI driven</li>
            </ul>
          </li>
          <li>Hybrid Modelling</li>
        </ul>
      </div>
      
      <div>
        <h2>Motor Faults</h2>
        <ul>
          <li>Bearing Fault - 51%</li>
          <li>Stator Winding Fault - 16%</li>
          <li>Rotor Bar Fault - 5%</li>
          <li>Shaft Coupling Fault - 2%</li>
          <li>External Conditions - 16%</li>
          <li>Others - 10%</li>
        </ul>
      </div>
      
      <div>
        <h2>Major components of IM</h2>
        <ul>
          <li>Induction Motor</li>
          <li>Rotating
            <ul>
              <li>Rotor bar</li>
              <li>Bearing</li>
            </ul>
          </li>
          <li>Static
            <ul>
              <li>Stator</li>
              <li>Winding</li>
            </ul>
          </li>
        </ul>
      </div>
      
      <div>
        <h2>Fault Characteristics</h2>
        <ul>
          <li>Rotor Bar Fault
            <ul>
              <li>Consists of solid copper bars and aluminium</li>
              <li>Rotating Part of IM</li>
              <li>Average lifespan of rotor bar is 25-40 years</li>
            </ul>
          </li>
          <li>Stator Fault
            <ul>
              <li>Consists of copper coils</li>
              <li>Static Part</li>
              <li>Stator windings have comparatively larger lifespan (18-30 years)</li>
            </ul>
          </li>
          <li>Bearing Fault
            <ul>
              <li>Consists of steel alloys</li>
              <li>Rotating Part</li>
              <li>Bearing life is indicated by its L10 value (in range of 10,000-20,000 hours)</li>
            </ul>
          </li>
        </ul>
      </div>
      
      <div>
        <h2>Assumption for Degradation model</h2>
        <ul>
          <li>We have 3 different lifespans for 3 different components</li>
          <li>Remaining Useful life of induction motor is:
            <p>RUL(IM) = Min(RUL(rotor bar failure), RUL(Stator winding failure), RUL(Bearing failure))</p>
          </li>
          <li>Bearing life is very less compared to the lifespan of the other 2 components</li>
        </ul>
      </div>
      
      <div>
        <h2>Dataset Generation from Fault Model</h2>
      </div>
      
      <div>
        <h2>Time Domain Features</h2>
        <ul>
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
        </ul>
        <h2>Spectral Domain Features</h2>
        <ul>
          <li>Spectral Domain Kurtosis</li>
          <li>Total Harmonic Distortion (THD)</li>
          <li>Power Spectral Density Mean</li>
          <li>Spectral Domain Skewness</li>
        </ul>
      </div>
      
      <div>
        <h2>Computation of Health Index (Output)</h2>
        <p>HI can be any function which is monotonically increasing/decreasing with the propagation of fault severity</p>
        <p>We considered severity as normalized sideband frequency amplitude.</p>
        <p>Normalization is done using fundamental frequency amplitude.</p>
      </div>
      
      <div>
        <h2>Model Training & Update</h2>
        <ul>
          <li>Time Domain Feature</li>
          <li>Frequency Domain Feature</li>
        </ul>
      </div>
      
      <div>
        <h2>Structure of Trained Model</h2>
        <ul>
          <li>Recurrent Neuron unit</li>
          <li>Perceptron Model
            <ul>
              <li>Input layer = 14 units</li>
              <li>1st Hidden layer = 256 units</li>
              <li>2nd Hidden layer = 128 units</li>
              <li>3rd Hidden Layer = 32 units</li>
              <li>4th Hidden Layer = 16 units</li>
              <li>5th Hidden Layer = 64 units</li>
              <li>Output Layer = 1 unit</li>
              <li>Batch size = 64</li>
              <li>Epochs = 50</li>
            </ul>
          </li>
        </ul>
      </div>
      
      <div>
        <h2>Prediction of RUL</h2>
      </div>
    </div>
  );
};

export default HealthCard;
