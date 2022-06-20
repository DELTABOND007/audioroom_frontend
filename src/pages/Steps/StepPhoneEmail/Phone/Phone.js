import React, { useState } from 'react';
import styles from '../StepPhoneEmail.module.css';
import Card from '../../../../components/shared/card/Card';
import Button from '../../../../components/shared/button/Button';
import TextInput from '../../../../components/shared/TextInput/TextInput';
import { sendOtp } from '../../../../http/index';
import { useDispatch } from 'react-redux';
import { setOtp } from '../../../../store/authSlice';

import Swal from 'sweetalert2'
// onclick on left is the main jsx attrubute while onClick on right is the parameter .Just putted the name same .you can also change them

const Phone = ({onClick}) => {

  const [phoneNo,setPhoneNo]=useState('')
  const dispatch=useDispatch('')
  
  async function submit(){
    if (!phoneNo) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Number Required',
      })
			return;//validation =>so that cant send request
		}else{
      Swal.fire(
        'Number added Successfully!',
        `${phoneNo}`,
        'success'
      )
    }
   const {data}= await sendOtp({phone:phoneNo})
   console.log(data )
   dispatch(setOtp({phone:data.phone ,hash:data.hash}))
   onClick();
  }

  return(
    <Card title="Enter your Phone number" icon="Emoji">
       <TextInput value={phoneNo} onChange={(e)=>
       setPhoneNo(e.target.value)
       }/>
       <div>
      
      <div className={styles.actionButtonWrapper}>
      <Button text="Next" onClick={submit}></Button>       {/* button code in button components ,,,//here on click is the event */}
      </div>
      <p className={styles.termsCondn}>By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!</p>
       </div>
  
  </Card>
  )
};

export default Phone;
