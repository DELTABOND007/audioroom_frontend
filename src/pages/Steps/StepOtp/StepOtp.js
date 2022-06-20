import React,{useState} from 'react';
import Card from '../../../components/shared/card/Card';
import Button from '../../../components/shared/button/Button';
import styles from './StepOtp.module.css';
import TextInput from '../../../components/shared/TextInput/TextInput';
import {verifyOtp} from '../../../http/index';
import {useSelector} from 'react-redux';
import {setAuth} from '../../../store/authSlice';
import {useDispatch} from 'react-redux';
import Swal from 'sweetalert2'

const StepOtp = () => {

  const [otp,setOtp]=useState('');
  const dispatch=useDispatch('');
  const {phone,hash}=useSelector((state)=>state.auth.otp);
  
  async function submit (){
    if(!otp || !phone ||!hash) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Provide Correct OTP',
        
      })
      return; //validation=>so that doesnt send request
    }else{
      Swal.fire(
        'Registered',
        'OTP verified',
        'success'
      )
    }
    
    try {                                                   //for handling server request in case we get error thus we use this
      const {data} = await verifyOtp({otp,phone,hash})
      console.log(data)
      dispatch(setAuth(data));
    
    } catch (err) {
      console.log(err)
    }
    
  }
  return (
  <>
  <div className={styles.cardWrapper}>
  <Card title="Enter the code we just texted you" icon="lock">
        <TextInput value={otp} placeholder="12345" onChange={(e)=>
       setOtp(e.target.value)
       }/>
       
     <div className={styles.actionButtonWrapper}>
      <Button onClick={submit} text="Next"></Button>        {/*button code in button components*/}
      </div>
      <p className={styles.termsCondn}>By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!</p>
  
  </Card>
</div>
  </>)

};

export default StepOtp;
