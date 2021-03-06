import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import {logout} from '../../../http';
import {useDispatch,useSelector} from 'react-redux';
import { setAuth } from '../../../store/authSlice';

const Navigation = () => {
const brandStyle={
    color:'#fff',
    textDecoration:'none',
    fontWeight:'bold',
    fontSize:'22 px',
    display:'flex',
    alignItems:'center',
}
const logoText={
    marginLeft:'10px',
}

const dispatch=useDispatch();
const { isAuth, user } = useSelector((state) => state.auth);

async function logoutUser(){
  try {
    const {data}=await logout();
    dispatch(setAuth(data))
  } catch (err) {
    console.log(err);
  }
  
}
  return <nav className={`${styles.navbar} container`}> {/*this is not going to get assigned to child class i.e the styles*/}
      <Link style={brandStyle} to='/'>
        <img src='/images/logo.png' alt='hlogo'/>
        <span style={logoText}>AudioRoom</span>

      </Link>
       {/*isAuth && { <button onClick={logoutUser}>Logout</button>} short circuit used here below  */}
     {isAuth &&
      <div className={styles.navRight}>
      <h3>{user?.name}</h3>
     {user.photo && (
      <Link to="/">
        <img src={user.photo
                                    ? user.photo
                                    : '/images/monkey.png'
                            }
        className={styles.photo} 
        width="40" 
        height="40"
        alt="photo"/>
      </Link>
     )}

      <button className={styles.logoutButton} onClick={logoutUser}>
        <img src="/images/logout.png" alt="logout" />
      </button>
      
     
      </div>}
  </nav>;
};

export default Navigation;
