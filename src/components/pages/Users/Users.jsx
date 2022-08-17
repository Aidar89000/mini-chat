import { useEffect } from "react"
import axios from 'axios'
import { useState } from "react"
import classes from './Users.module.css'
import { Input } from "../../UI/Input/Input"
import { useAuth } from "../../../hook/useAuth"

import { Button } from "../../UI/Button/Button"

import Loader from "../../UI/Loader/Loader"

const Users = (props)=>{

    const {user} = useAuth()

    const [users, setUsers] = useState('')

    const [searchInp, updateSearch] = useState('')

    const dbUrl = 'https://mini-chat-8284e-default-rtdb.europe-west1.firebasedatabase.app'
    const dbKey = 'AIzaSyDlZjF_a8QFuAek2rwjJN4tLnZJ8LHvQpM'


    useEffect(e=>{
       async function getUsers(){

            const allUsers = await axios.get(`${dbUrl}/users.json`)

            setUsers(allUsers.data)
            
        }
        getUsers()
    },[])

    return(
        <div>
            <Input onChange={e=>updateSearch(e.target.value)}>Найти человека</Input>

            <div className="Users">
                {users? Object.keys(users).map((e,i)=>
                    users[e].email.toUpperCase().trim().search(searchInp.toUpperCase().trim())!==-1 ?
                       
                            <div className={classes["user"]} id={users[e].email} >
                                <h1 key={i} id={users[e].email} >{users[e].email}</h1>
                            </div>

                        : ''
                
                ): <Loader/>}
            </div>

        </div>
    )
}

export {Users}