import React, { useState } from 'react';
import styles from '../StepPhoneEmail.module.css';
import Card from '../../../../components/shared/card/Card';
import Button from '../../../../components/shared/button/Button';
import TextInput from '../../../../components/shared/TextInput/TextInput';
import { useDispatch } from 'react-redux';
import { sendOtp } from '../../../../http';
import { setOtp } from '../../../../store/authSlice';
const Email = ({onClick}) => {

  const [emailId,setemailId]=useState('')
  const dispatch=useDispatch('')

  async function submit(){
    if(!emailId) return;

  const {data}=await sendOtp({email:emailId})
  console.log(data)
  dispatch(setOtp({email:data.email,hash:data.hash}))
  onClick();
  }

  return (
    <Card title="Enter your Email id" icon="mail">
    <TextInput value={emailId} onChange={(e)=>
       setemailId(e.target.value)
       }/>
       <div>

       <div className={styles.actionButtonWrapper}>
      <Button text="Next" onClick={submit}></Button>        {/*button code in button components*/}
       </div>

       <p className={styles.termsCondn}>By entering your Email Id, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!</p>
       
       </div>
  
  </Card>
  )
};

export default Email;
