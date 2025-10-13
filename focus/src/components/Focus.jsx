import React, { useEffect, useState } from 'react'
import { Link, Outlet,useNavigate  } from 'react-router'
import 'remixicon/fonts/remixicon.css'
import {DatePicker, Select} from 'antd'

function Focus() {

  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const navigate = useNavigate();

  useEffect(()=>{
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000);
    return ()=>{
      clearInterval(interval)
    }
  },[])

 


  return (
    <>
      <div className="bg-gradient-to-br from-pink-300 to-orange-400 via-cyan-500 w-screen h-screen flex p-3 ">
      
        {/* left tool box and nav */}
        <div className="bg-white/70 backdrop-blur-2xl w-[20%] h-full rounded-l-2xl text-white">
          {/* logo and site name */}
          <div className=" w-full h-[9.7%] flex justify-center items-center gap-3 border-b  border-black/30 mastShodow">
            <img src="/icon2.png" alt="logo" width={40} height={40} />
            <h1 className="text-2xl font-medium text-black">Focus | Planner</h1>
          </div>

          {/* naveMenu */}
          <div className=" w-full h-[90%] flex flex-col items-center pt-5 gap-3">
            <div className='w-full h-full flex flex-col items-center gap-3'>
              <Link to="dashboard" className='w-full flex justify-center items-center'>
            <button className="mastShadow !bg-gradient-to-bl from-indigo-400 via-pink-300 to-indigo-400 !hover:bg-gradient-to-br !hover:from-indigo-400 !hover:via-cyan-400 !hover:to-purple-400 text-[18px] w-[90%] h-[40px] rounded-md"><i className="ri-dashboard-line mr-1"></i> Progress Board </button>
            </Link>
            
            
            <Select placeholder="View All Task" size="large" className="w-[90%] text-center font-medium !border-none !outline-none mastShadow !rounded-lg " onChange={(value) => navigate(value)}>
              <Select.Option value="higher">Higher Priority Task</Select.Option>
              <Select.Option value="medium">Medium Priority Task</Select.Option>
              <Select.Option value="lower">Lower Priority Task</Select.Option>
            </Select>
            </div>


            <div className=' w-full h-[40px]'>
              <div className='text-end flex justify-center items-center w-full'>
            <h1 className='text-2xl font-bold font-mono text-neutral-400'>{time}</h1>
            </div>
            </div>
            
            
          </div>

        </div>

        {/* content box */}
        <div className="bg-white/30 backdrop-blur-2xl w-[80%] h-full rounded-r-2xl mastShadow relative overflow-y-auto">
        <Outlet/>
        </div>

       








      </div>
    </>
  )
}

export default Focus
