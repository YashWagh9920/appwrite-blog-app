import { useEffect, useState } from 'react'
import { Footer, Header } from './components'
import { useDispatch } from 'react-redux'
import authService from './appwrite_services/auth'
import {login,logout} from "./Store/authSlice"
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
       dispatch(login(userData))   
         }
       else{
        dispatch(logout())
       }
    })
    .finally(()=> setLoading(false))
  }, [])
   
  return loading ? 
  <div className='h-screen flex justify-center items-center'><div className='text-center text-xl font-bold '>Loading...</div></div> :
    <div>
    <Header/>
    <main>
    <Outlet/>
    </main>
    <Footer/>
    </div>
}

export default App
