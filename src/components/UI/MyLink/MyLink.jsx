import { NavLink } from "react-router-dom";
import classes from './MyLink.module.css'

const MyLink = props =>{
    return(
        <span >
            <NavLink
            className={props.className ? classes[props.className]: classes['my-navlink']}
            to={props.to}>
            {props.children} </NavLink>
         </span>
    )
}

export {MyLink}