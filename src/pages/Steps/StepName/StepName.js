import React, { useState } from 'react';
import Card from '../../../components/shared/card/Card';
import Button from  '../../../components/shared/button/Button'
import TextInput from '../../../components/shared/TextInput/TextInput'
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../../store/activateSlice';
import styles from './StepName.module.css';
import Swal from 'sweetalert2';

const StepName = ({ onNext }) => {
  const { name } = useSelector((state) => state.activate);
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState(name);

  function nextStep() {
      if (!fullname) {
        Swal.fire('Please Provide Your Name')
        return;
      }
      dispatch(setName(fullname));
      onNext();
  }
  return (
      <>
          <Card title="What’s your full name?" icon="smiley">
              <TextInput
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
              />
              <p className={styles.paragraph}>
                  People use real names at AudioRoom :)!
              </p>
              <div>
                  <Button onClick={nextStep} text="Next" />
              </div>
          </Card>
      </>
  );
};

export default StepName;
