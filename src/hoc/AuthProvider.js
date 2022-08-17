import {createContext, useState} from 'react'

export const AuthContext = createContext(null)

export const AuthProvider = ({children})=>{

    const [user, updUser] = useState('')

    const signIn = (newUser,cb) => {
        updUser(newUser)
        cb()
    }

    const signOut = (cb) => {
        updUser(null)
        cb()
    }


    const value = {user, signIn, signOut }


    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}