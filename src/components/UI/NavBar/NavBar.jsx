import { MyLink } from '../MyLink/MyLink'
import classes from './NavBar.module.css'

const NavBar = props =>{

    const navigation = [
        {text: 'Комнаты', link: 'Rooms'},
        {text: 'Профиль', link: 'Profile'},
    ]
    
    return(
        <div className={classes['my-navbar']}>
        <div className={classes['my-navbar__links']}>
            { navigation.map((e,i)=><MyLink key={i} to={navigation[i].link}>
        {navigation[i].text} </MyLink>)}
        </div>   
            {/* <MyLink to='Profile' ><h3 className={classes['my-navbar__user']}>{user.email}</h3></MyLink> */}
        </div>
    )
}

export default NavBar