import { useEffect, useState } from 'react'
import {useDispatch} from "react-redux"
import authService from "./appwrite/auth"
import {login,logout} from "./store/authSlice"
import {Header, Footer} from "./components"
import './App.css'

function App() {
  
  let [loading,setLoading]=useState(true);
  const dispatch= useDispatch() 

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))

  },[])
   
return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          Todo
        {/* TODO:  <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
