import { useState } from 'react'
import './Chat.css'
import axios from 'axios'
import { useAuth } from '../../../hook/useAuth'
import { useEffect } from 'react'
import Loader from '../../UI/Loader/Loader'
import { Message } from '../../UI/Message/Message'
import { useParams } from "react-router-dom"
import { Input } from '../../UI/Input/Input'

const Chat = (props)=>{

    const {roomId} = useParams()

    const {user} = useAuth()

    const dbUrl = 'https://chat-bcb26-default-rtdb.europe-west1.firebasedatabase.app'
   
    const [message, setMessage] = useState({
        messageText: '',
        by: user.email,
        userAvatar: '',
        messageURL: ''
    })
    
    const [chatRoomData, setChatRoomData] = useState()

    async function getMessages(){
        const res = await axios.get(`${dbUrl}/Rooms/${roomId}/messages.json`)
        setChatRoomData(res.data)
    }

    const [userImg, setUserImg] = useState()

    async function getUserPhoto(){
        const res = await axios.get(`${dbUrl}/users.json`)
        Object.keys(res.data).map((e,i)=>{
            if (user.email === res.data[e].email)
                setUserImg(res.data[e].avatar)
        })
        
    }

    useEffect(e=>{
       getMessages()
       getUserPhoto()
    },[])

    async function sendMessage(){
        if(message.messageText.length>0||message.messageURL.length>0){
            await axios.post(`${dbUrl}/Rooms/${roomId}/messages.json`, message)

        }
    }

    async function updateMessage(messageID, text){

        setMessage({...message, messageText: text,})
        await axios.patch(`${dbUrl}/Rooms/${roomId}/messages/${messageID}.json`,{messageText:message.messageText})

    }

    async function deleteMessage(messageID){
        await axios.delete(`${dbUrl}/Rooms/${roomId}/messages/${messageID}.json`)
    }

    function onFileSelected(event) {
 
        let reader = new FileReader();

        reader.onload = function(event) {
            setMessage({...message, messageURL: event.target.result,
            url:true, userAvatar:userImg,})
        }
      
        reader.readAsDataURL(event.target.files[0])
      }
    return(
        <div>
            <div className="messages">
                {chatRoomData ? Object.keys(chatRoomData).map((e,i)=>

                <Message 
                 messageURL={chatRoomData[e].messageURL}
                 userAvatar={chatRoomData[e].userAvatar}
                 updateMessage={updateMessage}
                 deleteMessage={deleteMessage}
                 messageID={e}

                 key={i} userNikName={chatRoomData[e].by}>
 
                    {chatRoomData[e].messageText}
                </Message>)

                : <Loader/>}
            </div>

            <div className="messages__tools">

                <label className="input-file">фото
                    <input type={'file'} onChange={e=>onFileSelected(e)} accept="image/*"/>
                </label>

                <Input className={'chat-input'} labelClassName={'chat-label-text'} value={message.messageText} onChange={e=>{
                    setMessage({...message, messageText: e.target.value, userAvatar:userImg, url:false})
                }}></Input>

                <button onClick={async ()=>{
                    await sendMessage() 
                    await getMessages()
                    
                    setMessage({...message, messageText: '', messageURL: ''})

                    document.querySelector('.chat-input').value=''
                }}>
                    Отправить
                </button>

            </div>

        </div>
    )
}

export {Chat}