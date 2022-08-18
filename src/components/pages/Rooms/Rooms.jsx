
import axios from "axios"
import { useEffect, useState } from "react"
import { Input } from "../../UI/Input/Input"

import './Rooms.css'

import { MyLink } from "../../UI/MyLink/MyLink"
import { useAuth } from '../../../hook/useAuth'


const Rooms = props =>{

    const [rooms, updateRooms] = useState()

    const [roomName, updateRoomName] = useState('')

    const [smallTextError, updateSmallTextError] = useState(
        {text:'слишком мало символов', isTrue: true},
    )
    const {user} = useAuth()

    const dbUrl = 'https://chat-bcb26-default-rtdb.europe-west1.firebasedatabase.app'

    async function addRoom(){
        if (roomName.length>0){
            await axios.post(`${dbUrl}/Rooms.json`,
            {
                roomName: roomName,
                messages:[],
                roomId: Math.floor(Math.random()*10**12),
                by: user.email,
            })
           
        }
    }

    async function renderRooms(){
        const res = await axios.get(`${dbUrl}/Rooms.json`)
        updateRooms(res.data)
    }

    async function deleteMessage(messageID){
        await axios.delete(`${dbUrl}/Rooms/${messageID}.json`)
    }

    useEffect(()=>{
        renderRooms()
    })

    return(
        
    <>

        <div className="rooms-header">

            <Input value={roomName}
            className={'rooms-header-input'}
            labelClassName={'.rooms-header-label-text'}
             onChange={e=>{
                updateRoomName(e.target.value)
                updateSmallTextError({text:'слишком мало символов', isTrue: e.target.value.trim().length>0?true:false})
            }}

             smallTextError={smallTextError}>
             название комнаты
            </Input>

            <button disabled={smallTextError.isTrue? null:'disabled'} onClick={async()=>{
              
                await addRoom()
                await renderRooms()

                updateRoomName('')

            }}>добавить комнату</button>

        </div>

            <div className="rooms-container">

                { rooms ?Object.keys(rooms).map((e,i)=>{
                                
                    return <div className='room' key={i} id={rooms[e].roomId}>

                        <h2>{rooms[e].roomName}</h2>

                        <div className="room__tools">

                            {rooms[e].by === user.email?
                            <div className='message__tools'>
                                <img src='/icons/trash.svg' alt='удалить'
                                className="input-btn"  onClick={()=>deleteMessage(e)}/>
                            </div>:null
                            }

                            <MyLink to={`/Chat/${e}`} className='room-btn-join'>
                                {rooms[e].by?
                            <img src='/icons/plus.svg' alt='+' className="input-btn"/>:null
                                }                           
                            </MyLink>

                        </div>

                    </div>
                }

                ): null }

            </div>

    </> 
    )
}

export {Rooms}