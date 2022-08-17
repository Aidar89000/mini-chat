import './Message.css'
import { useAuth } from '../../../hook/useAuth'
import Loader from '../Loader/Loader'

const Message = props =>{

    let messageStates = 'message'

    const {user} = useAuth()

    if (props.userNikName === user.email){
        messageStates = 'my-message'
    }
    else{
        messageStates = 'message'
    }

    return(

        <div className={messageStates} >

            <div className='message__user-avatar-nikName'>
                <img src={props.userAvatar} alt="фото" className="message__user-avatar"/>

                <h3>{props.userNikName}</h3>
            </div>
            
        <h2>{props.children}</h2>
        {props.messageURL?<img className="message-photo" src={props.messageURL} alt=''/>:null}

        
        
        {messageStates==='my-message'?<div className='message__tools'>
            <img src='/icons/notepad.svg' className="input-btn" alt='изменить'  id={props.children} onClick={e=>props.updateMessage(props.messageID,e.target.id)}/>
            <img src='/icons/trash.svg' alt='удалить' className="input-btn"  onClick={()=>props.deleteMessage(props.messageID)}/>
        </div>:null}
        
        </div>
    )
}

export {Message}