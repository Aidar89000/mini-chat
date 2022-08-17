import {Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../hook/useAuth";

function ReqAuth(props){

    let location = useLocation();

    let {user} = useAuth()

    if (!user){
        return <Navigate to='/Auth' state={{from: location}}/>
    }

    return props.children
}

export {ReqAuth}