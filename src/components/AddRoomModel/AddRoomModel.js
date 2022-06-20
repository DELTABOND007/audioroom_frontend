import React, { useState } from 'react'
import TextInput from "../shared/TextInput/TextInput"
import styles from "./AddRoomModel.module.css";
import {createRoom as create} from '../../http/index'; //beacuse both name are same thus creating alias
import { useHistory } from "react-router-dom";

const AddRoomModel = ({onClose}) => {
    
    const history=useHistory();
    const [roomType,setRoomType]=useState('open')
    const [topic,setTopic]=useState('')
    

    const settingTopic=(event)=>{
        setTopic(event.target.value)
    }

    async function createRoom(){
        //server call
        try {
            if(!topic) return;
            const {data}=await create({topic,roomType})
            history.push(`/room/${data.room.id}`);
            console.log(data.room.id)

        } catch (error) {
            console.log(error.message)
        }
    }
  return (
        <div className={styles.modalMask}>
             <div className={styles.modalBody}>
             <button onClick={onClose} className={styles.closeButton}>
                 <img src="/images/close.png"/>
             </button>
                 <div className={styles.modalHeader}>
                    <h2 className={styles.heading}>Enter Topics To Be Discussed</h2>
                    <TextInput fullwidth="true" value={topic} onChange={settingTopic}/>
                    <h2 className={styles.subHeading}>Room Types</h2>
                    
                    <div className={styles.roomType}>
                        <div onClick={()=>setRoomType('open')} className={`${styles.typeBox} ${roomType==='open'?styles.active:''}`}>
                            <img src="/images/globe.png"/>
                            <span>Open</span>
                        </div>

                        <div onClick={()=>setRoomType('social')} className={`${styles.typeBox} ${roomType==='social'?styles.active:''}`}>
                            <img src="/images/social.png"/>
                            <span>Social</span>
                        </div>

                        <div onClick={()=>setRoomType('private')} className={`${styles.typeBox} ${roomType==='private'?styles.active:''}`}>
                            <img src="/images/YellowLock.png"/>
                            <span>Private</span>
                        </div>
                    </div>
                 </div>

                 <div className={styles.modalFooter}>
                       <h2>Start a Room,Open to Everyone</h2>
                       <button className={styles.footerButton} onClick={createRoom}>
                       <img src="/images/celeb.png"/><span>Lets Go</span>
                       </button>
                 </div>
            </div>
        </div>
  )
}

export default AddRoomModel