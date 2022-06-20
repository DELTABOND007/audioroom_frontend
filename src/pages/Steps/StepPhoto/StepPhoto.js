import React, { useState,useEffect } from 'react';
import Card from '../../../components/shared/card/Card';
import Button from  '../../../components/shared/button/Button';
import styles from './StepPhoto.module.css';
import { useSelector,useDispatch } from 'react-redux';
import { setPhoto } from '../../../store/activateSlice';
import { activate } from '../../../http';
import {setAuth} from '../../../store/authSlice'
import Loader from '../../../components/shared/Loader/Loader';
import Swal from 'sweetalert2';


const StepPhoto = ({onNext}) => {
  const dispatch=useDispatch();
  const {name,photo}=useSelector((state) => state.activate);
  const [image,setImage]=useState('/images/monkey.png');
  const [loading, setLoading] = useState(false);
  const [unMounted, setUnMounted] = useState(false);
  function captureImage(e){
    
    //console.log(e) //you will get idea about how the below code works

    const file=e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend=function(){
      setImage(reader.result);
      dispatch(setPhoto(reader.result)) //incase we go back so that particular images stays there
    }

  }
  async function submit(){
    if(!name || !photo){
      Swal.fire('Please Provide some Avatar')
      return;
    }
    setLoading(true);
    try{
       const {data}= await activate({name,photo})
       if(data.auth){
         if(!unMounted){
         dispatch(setAuth(data)) //already data has been destructured in line 35
        }
       }

      }catch(err){       
      console.log(err);
      }finally {
      setLoading(false);
      }

  }
  useEffect(() => {
    return () => {
        setUnMounted(true);
    };
}, []);
  if (loading) return <Loader message="Processing..." />;
  return <>
 
      <Card title={`Okay, ${name}`} icon="monkey">
        <p className={styles.subHeading}>How’s this photo?</p>

        <div className={styles.photoWrapper}>
                    <img
                        className={styles.photoImage}
                        src={image}
                        alt="avatar"
                    />
                </div>
                <div>
                    <input
                        onChange={captureImage}
                        id="photoInput"
                        type="file"
                        className={styles.photoInput}
                    />
              
                    <label className={styles.photoLabel} htmlFor="photoInput"> {/*label is connected with id*/}
                        Choose a different photo
                    </label>
                </div>
      <div >
      <Button onClick={submit} text="Next"></Button>        {/*button code in button components*/}
       </div>
  </Card> 
  </>
}; 

export default StepPhoto;
