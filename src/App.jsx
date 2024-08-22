
// import { useEffect, useState } from 'react'
// import './App.css'
// import{useDispatch} from 'react-redux'
// import Authservice from './apwrite/auth'
// // import {login,logout} from "./store/authSlice"
// import { Footer,Header } from './components'
// import { Outlet } from 'react-router-dom'





// function App() {
//  const [loading ,setLoading] = useState(true)  
//  const dispatch = useDispatch()

//  useEffect (()=>{
//   Authservice.getCurrentUser()
//  . then((userdata)=>{
//   if(userdata){
//     dispatch(login({userdata}))
//   }else{
//     dispatch(logout())
//   }
    
//  })
//  .finally(()=>{setLoading(false)})
//  },[])


//  return !loading ? (
//   <div className='min-h-screen  flex flex-wrap content-between bg-gray-400'>
    
//     <div className='w-full block'>
//       <Header/>
//       <main>
//        todo {/* <Outlet/> */}
//       </main>
//       <Footer/>
//     </div>
//   </div>
//  ):null
// }

// export default App



import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './apwrite/auth'
import {login,logout} from './store/authSlice'
import { Footer,Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {


  const [loading,setLoading]=useState(true)
  const dispatch =useDispatch()

  useEffect(()=>{
    authService.getCurrentUser().then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))


  },[])



  return !loading ? (
    <div className='min-h-screen flex-wrap   content-between  bg-gray-400'>

      <div className='w-full-block'>
        <Header />
        <main>
          {/* <Outlet/> */} to do 
        </main>
        <Footer />
      </div>
    </div>
  )
  :null
}

export default App
