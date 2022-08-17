import {Outlet} from 'react-router-dom'
import NavBar from '../NavBar/NavBar'

const Layout = props =>
    <>
        <NavBar/>
        <main>
            <Outlet></Outlet>
            {props.children}
        </main>
    </>

export {Layout}