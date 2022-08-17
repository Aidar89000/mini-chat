
import {useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../../../hook/useAuth"

import { useState } from "react";

import { Input } from "../../UI/Input/Input";
import axios from "axios";

import './Profile.css'
import { Button } from "../../UI/Button/Button";
import { useEffect } from "react";
import Loader from '../../UI/Loader/Loader'


const Profile = (props)=>{

    const navigate = useNavigate()
    const location = useLocation()

    const fromPage = location.state?.from?.pathname || '/'

    const [userImg, setUserImg] = useState()
    const [userImgUpload, setUserImgUpload] = useState()

    const dbUrl = 'https://mini-chat-8284e-default-rtdb.europe-west1.firebasedatabase.app'
    const dbKey = 'AIzaSyDlZjF_a8QFuAek2rwjJN4tLnZJ8LHvQpM'

    

    const {user} = useAuth()

    function onFileSelected(event) {
        let selectedFile = event.target.files[0];
        let reader = new FileReader();
      
        let imgtag = document.querySelector('img')
        imgtag.title = selectedFile.name;
      
        reader.onload = function(event) {
          imgtag.src = event.target.result;
          setUserImgUpload(event.target.result)
        };
      
        reader.readAsDataURL(selectedFile);
      }
    
    async function getUserPhoto(){
        const res = await axios.get(`${dbUrl }/users.json`)
        Object.keys(res.data).map((e,i)=>{
            if (user.email === res.data[e].email)
                setUserImg(res.data[e].avatar)
        })
        
    }

    useEffect(()=>{
        getUserPhoto()
    },[])

    async function setUserPhotoToDB(id){
        await axios.patch(`${dbUrl}/users/${id}.json`,{avatar:userImgUpload})
    }
    
    async function uploadUserPhoto(){
        const res = await axios.get(`${dbUrl}/users.json`)
        Object.keys(res.data).map((e,i)=>{
            if (user.email === res.data[e].email)
                setUserPhotoToDB(e)
        })
    }
    
    return(
        <div className="profile">

            <div className="about">

            <div className={'about__user-info'}>
                {userImg?<img src={userImg} alt="фото" className="user-avatar"/>:<Loader/>}
                <div className={'user-info__additionally'}>
                    
                    <h2> логин: <span>{user.email}</span></h2>
                    <h2> пароль: <span>{user.password}</span></h2>
                
                <div className={'additionally__file-manager'}>
                    <label className="input-file">
                        выбрать файл
                        <input type={'file'} onChange={e=>onFileSelected(e)}/>
                    </label>
                    <label className="input-file-btn" onClick={uploadUserPhoto}>Загрузить фото</label>
                </div>
                    

                </div>
                
            </div>

            </div>

        </div>
    )
}

export {Profile}