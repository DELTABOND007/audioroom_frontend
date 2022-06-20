import React, { useState } from 'react';
import StepName from '../Steps/StepName/StepName';
import StepPhoto from '../Steps/StepPhoto/StepPhoto';

const steps = {
  1:StepName,
  2:StepPhoto
}
const Activate = () => {
  const [step,setStep]=useState(1);
  const Step=steps[step];

  function onNext(){
    setStep(step+1)
  }
  return <div className='cardWrapper'>
    <Step onNext={onNext}></Step>
  </div>;
};

export default Activate;
