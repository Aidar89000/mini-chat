import {Route, Routes} from 'react-router-dom'
import './App.css';
import { Chat } from './components/pages/Chat/Chat';

import { Layout } from './components/UI/Layout/Layout';
import { Profile } from './components/pages/Profile/Profile';
import { Auth } from './components/pages/Auth/Auth';
import { ReqAuth } from './hoc/ReqAuth';
import { AuthProvider } from './hoc/AuthProvider';
import { Rooms } from './components/pages/Rooms/Rooms'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>

          <Route element={<Layout/>} path='/'>

            <Route path='Chat/:roomId' element={<ReqAuth><Chat/></ReqAuth>}/>

            <Route path='/' element={<Rooms/>}/>
            <Route path='Rooms' element={<ReqAuth><Rooms/></ReqAuth>}/>

            {/* <Route path='Users' element={<Users/>}/> */}

            <Route path='Profile' element={<ReqAuth><Profile/></ReqAuth>}/>

            <Route path='Auth' element={<Auth/>}/>
           
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App;
