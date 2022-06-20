import React,{useState,useEffect}from 'react'
import { useWebRTC } from '../../hooks/useWebRTC'
import {useParams,useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import styles from './Room.module.css'
import { getRoom } from '../../http'
const Room = () => {

  const{id:roomId}=useParams();
  const user =useSelector((state)=>state.auth.user)
  const {clients,provideRef,handleMute}=useWebRTC(roomId,user); //for future info we have to pass this parameters
  const history=useHistory()
  const [room,setRoom]=useState(null) 
  const [mute,setMute]=useState(true)


  const leaving=()=>{
    history.push('/rooms') //going on previous page
  }

  useEffect(() => {
    const fetchRoom=async () =>{
      const {data}=await getRoom(roomId)
      console.log(data)
      setRoom((prev)=>data);
    }
    fetchRoom()
  }, [roomId])
  
useEffect(()=>{

handleMute(mute,user.id);

},[mute])

const handleMuteClick=(clientId)=>{
 // console.log('click',clientId)
 
 if(clientId!=user.id) return; //writing this part so that in particular room each can make changes to his/her own mic and not others
  
 setMute((prev)=>!prev) //if previous is mute than do unmute or viceversa

}
  return (
    <div>
    <div className='container'>
      <button className={styles.goBack} onClick={leaving}>
        <img src="/images/arrow_backward.png"/>
        <span>All Voice Rooms</span>
      </button>
    </div>

    <div className={styles.clientsWrap}>
    <div className={styles.header}>
        <h2 className={styles.topic}>{room?.room.topic}</h2>
        <div className={styles.actionButtons}>
          <button className={styles.actionbtn}><img src="/images/close.png"/></button>
          <button className={styles.actionbtn} onClick={leaving}><img src="/images/arrow_backward.png"/>
          <span>Leave Quietly</span>
          </button>
        </div>
    </div>
     <div className={styles.clientsList}>
     {
      clients.map((client)=>{
        return (<div className={styles.client} key={client.id}>
          <div  className={styles.userHead}>
          <audio 
          ref={(instance)=>provideRef(instance,client.id)}
           autoPlay>
          </audio>
          <img src={client.photo} alt="photo" className={styles.userPhoto}/>
        <button className={styles.micBtn} onClick={()=>handleMuteClick(client.id)}>
        {
          client.muted?(<img src="/images/mic-off.png"/>):(<img src="/images/mic.png"/>)
        }
          
          
        </button>
        </div>
        <h2>{client.name}</h2>
        </div>)
      })
    }

     </div>
    </div>
    </div>
  )
}

export default Room