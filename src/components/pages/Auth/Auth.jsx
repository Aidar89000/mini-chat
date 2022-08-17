
import { useState }from 'react'
import axios from 'axios'
import {useNavigate, useLocation } from "react-router-dom";
import { ReqAuth } from '../../../hoc/ReqAuth';
import { Input } from '../../UI/Input/Input';
import {Button} from '../../UI/Button/Button'
import './Auth.css'

import { useAuth } from '../../../hook/useAuth';



const Auth = props =>{

    const navigate = useNavigate()
    const location = useLocation()

    const {signIn} = useAuth()

    const fromPage = location.state?.from?.pathname || '/'

    const [user, setUser] = useState({
        email: '',
        password: '',
        returnSecureToken: true,
        auth: false,
        id: Math.floor(Math.random()*100),
        avatar: 'https://cdn-icons-png.flaticon.com/512/482/482636.png',
        emailError: {text:'неправильная почта. Пример(Vasya@Pupkin.ru)', isTrue: false},
        passwordError:{text:'в пароле должно быть минимум 6 символов', isTrue: false},
        
    })

    function validateEmail(email) {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const dbUrl = 'https://mini-chat-8284e-default-rtdb.europe-west1.firebasedatabase.app'
    const dbKey = 'AIzaSyDlZjF_a8QFuAek2rwjJN4tLnZJ8LHvQpM'

    async function registration(){

        if (validateEmail(user.email) && user.password.length > 5 ){

        try{
                await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${dbKey}`, user)
                await axios.post(`${dbUrl}/users.json`, user)
                alert('регистрация прошла успешно')
        }
        catch(e){
            console.log(e)
        }
            
    }
    }

    async function validation(){

        if (validateEmail(user.email) && user.password.length > 5 ){

            setUser({
                ...user,
                auth: true
            })
            
        try{
            await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${dbKey}`, user)
            signIn(user, ()=>navigate(fromPage, {replace: true}))
            
        }
        catch(e){
            console.log(e)
        }
            
    }
    }

    function isDisabledButton(){
        if (!user.emailError.isTrue)
            return true
        
        if (!user.passwordError.isTrue)
            return true
        else{
            return  false
        }
    }

    return(
        <>

        <div className="auth">
            <form onSubmit={e => e.preventDefault()}  action="">

                <div className="auth-container">
                    
                    <Input type={'email'}
                     onChange={e=>

                     setUser({...user,
                     email: e.target.value.trim(),
                     emailError: {text: user.emailError.text, isTrue: validateEmail(e.target.value.trim()) ? true: false},

                     }) } emailError={user.emailError}>

                        логин</Input>

                    <Input type={'password'}
                     onChange={e=>setUser({
                        ...user,
                        password: e.target.value.trim(),
                        passwordError: {text: user.passwordError.text, isTrue: e.target.value.trim().length>5?true:false},
                    }) }
                     passwordError={user.passwordError}>
                        пароль</Input>

                    <div className='buttons-container'>

                        <Button onClick={()=>registration()} disabled={isDisabledButton()}>регистрация</Button>
                        
                        <Button onClick={()=>validation()} disabled={isDisabledButton()}>вход</Button>

                    </div>

                </div>

            </form>

        </div>
    
        </>
    )
}

export {Auth}

