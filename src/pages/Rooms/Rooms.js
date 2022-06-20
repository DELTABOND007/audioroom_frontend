import React, { useState,useEffect } from 'react';
import AddRoomModel from '../../components/AddRoomModel/AddRoomModel';
import RoomCard from '../../components/RoomCard/RoomCard';
import styles from './Rooms.module.css'
import {getAllRooms} from '../../http'
// const rooms = [ //dummy array
//       {
//           id: 1,
//           topic: 'Which framework best for frontend ?',
//           speakers: [
//               {
//                   id: 1,
//                   name: 'John Doe',
//                   photo: '/images/monkey.png',
//               },
//               {
//                   id: 2,
//                   name: 'Jane Doe',
//                   photo: '/images/monkey.png',
//               },
//           ],
//           totalPeople: 40,
//       },
//       {
//           id: 3,
//           topic: 'What’s new in machine learning?',
//           speakers: [
//               {
//                   id: 1,
//                   name: 'John Doe',
//                   photo: '/images/monkey.png',
//               },
//               {
//                   id: 2,
//                   name: 'Jane Doe',
//                   photo: '/images/monkey.png',
//               },
//           ],
//           totalPeople: 40,
//       },
//       {
//           id: 4,
//           topic: 'Why people use stack overflow?',
//           speakers: [
//               {
//                   id: 1,
//                   name: 'John Doe',
//                   photo: '/images/monkey.png',
//               },
//               {
//                   id: 2,
//                   name: 'Jane Doe',
//                   photo: '/images/monkey.png',
//               },
//           ],
//           totalPeople: 40,
//       },
//       {
//           id: 5,
//           topic: 'Artificial inteligence is the future?',
//           speakers: [
//               {
//                   id: 1,
//                   name: 'John Doe',
//                   photo: '/images/monkey.png',
//               },
//               {
//                   id: 2,
//                   name: 'Jane Doe',
//                   photo: '/images/monkey.png',
//               },
//           ],
//           totalPeople: 40,
//       },
//   ];

  
const Rooms = () => {

const [showModal,setShowModal]=useState(false)
const [rooms,setRooms]=useState([])

useEffect(() => {
  const fetchRooms=async()=>{
      const {data}=await getAllRooms();
      setRooms(data.allRooms) //it will be data.allRooms as it is getting created inside allrooms
      //console.log(rooms)
      //console.log(data)
  };
  fetchRooms()
  
}, [])

function openModal(){
    setShowModal(true)
}
  return( <>
<div className='container'>

  <div className={styles.roomsHeader}>

    <div className={styles.left}>

      <span className={styles.heading}>Voice Rooms</span>
      <div className={styles.searchBox}>
        <img src="/images/search.png" alt="search"/>
        <input type="text " className={styles.searchInput}/>
      </div>

    </div>

    <div className={styles.right}>
      <button onClick={openModal} className={styles.startRoomButton}>
        <img src="/images/room.png"/>
        <span> Start a Room</span>
      </button>
    </div>

  </div>
   <div className={styles.roomLists}>
    
      {rooms.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))}
   </div>   
</div>
    {showModal && <AddRoomModel onClose={()=>setShowModal(false)}/>}
</>)
};

export default Rooms;
