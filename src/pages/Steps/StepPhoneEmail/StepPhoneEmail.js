import React,{useState} from 'react';
import styles from './StepPhoneEmail.module.css'
import Phone from './Phone/Phone';
import Email from './Email/Email';

const phoneEmailMap = {
  phone:Phone,
  email:Email,
}
const StepPhoneEmail = ({onClick}) => {

  const [type,setType]=useState('phone');
  const ComponentType=phoneEmailMap[type];
    

  return (
    <>

<div className={styles.cardWrapper}>

    <div>

      <div className={styles.buttonWrapper}>

    <button className={`${styles.tabButton} ${type==='phone'? styles.active:''}`} 
    onClick={()=>{setType('phone')}}>
    <img src="/images/phone.png" alt='phone'/>
    </button>


    <button className={`${styles.tabButton} ${type==='email'? styles.active:''}`}  
    onClick={()=>{setType('email')}}><img src="/images/mail1.png" alt='mail1'/>
    </button>
    
    </div>

      <ComponentType onClick={onClick}/>
    </div>

</div>
    
  
  </>
  )
};

export default StepPhoneEmail;
