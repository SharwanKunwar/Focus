import React from 'react'
import { Outlet } from 'react-router'

function Focus() {
  return (
     <>
      <div className="bg-gradient-to-br from-pink-300 to-orange-400 via-cyan-500 w-screen h-screen flex p-3 ">
        {/* <div className='bg-red-400'>social</div> */}

        {/* left tool box and nav */}
        <div className="bg-white/30 backdrop-blur-2xl w-[20%] h-full rounded-l-2xl mastShadow text-white">
          {/* logo and site name */}
          <div className=" w-full h-[10%] flex justify-center items-center gap-3 border-b border-white/30 ">
            <img src="/icon2.png" alt="logo" width={40} height={40} />
            <h1 className="text-2xl font-medium">Focus | Planner</h1>
          </div>

          {/* naveMenu */}
          <div className=" w-full h-[90%] flex flex-col items-center pt-5 gap-3">
            <button className="bg-purple-400 w-[90%] h-[40px]">
              Dashboard
            </button>
            
            <button className="bg-purple-400 w-[90%] h-[40px]">
              View All Task
            </button>
          </div>

        </div>

        {/* content box */}
        <div className="bg-white/30 backdrop-blur-2xl w-[80%] h-full mastShadow relative">
        <div className='text-end pr-5 pt-5 flex flex-row-reverse absolute right-0 top-0 justify-stat items-center gap-5'>
          <button className='bg-white py-1 px-3 rounded-md '>Add Task</button> 
          <button className=' bg-white py-1 px-5 rounded-md'>Delete All Task</button> 
          <input type='date' placeholder='Select date' className=' bg-white py-1 px-5 rounded-md'></input>
          
        </div>
          <Outlet/>
        </div>









      </div>
    </>
  )
}

export default Focus
