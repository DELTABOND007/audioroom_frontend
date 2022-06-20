import React from 'react';
import { Link ,useHistory} from 'react-router-dom';
import Button from '../../components/shared/button/Button';
import Card from '../../components/shared/card/Card';
import styles from './Home.module.css'
const Home = () => {
  
  const signInLinkStyle={
        color:'#0077FF',
        marginLeft:'7px',
        fontWeight:'bold',
        textDecoration:'none',
  }

  function register (){
    history.push('/authenticate')
  }

  const history=useHistory();
  
  return(
   <div className={styles.cardWrapper}>
  <Card title="Welcome to AudioRoom!" icon="logo">
      <p className={styles.text}> Discussions Awaits Ahead:)
      </p>
       
       <div>
      <Button onClick={register} text="Lets go"></Button>        {/*button code in button components*/}
       </div>

       <div className={styles.signWrapper}>
      <span className={styles.hasInvite}>Have an invite text?</span>
       </div>
  
  </Card>

  {/* just for understanding */}

  
      {/* <div className={styles.card}>
        <div className={styles.headingWrapper}>
          <img src="./images/logo.png" alt="logo" />
          <h1 className={styles.heading}>Welcome to CodersHouse!</h1>
        </div>
       <p className={styles.text}> We’re working hard to get Codershouse ready for everyone! 
       While we wrap up the finishing youches, 
       we’re adding people gradually to make sure nothing breaks :)</p>
       <div>
       <button>
         <span>Get your username</span>   
         <img src="./images/arrow_forward.png" alt="arrlogo" />  
       </button>
       </div>

       <div>
        <span>Have an invite text?</span>
        <Link to="/login">Sign in</Link>
       </div>
  
  </div> */}
</div>)
};

export default Home;
