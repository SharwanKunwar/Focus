import React from 'react'

function Focus() {
  return (
     <>
      <div className="bg-sky-400 w-screen h-screen flex p-3">
        {/* <div className='bg-red-400'>social</div> */}

        {/* left tool box and nav */}
        <div className="bg-white w-[20%] h-full border-r border-black/30">
          {/* logo and site name */}
          <div className=" w-full h-[10%] flex justify-center items-center gap-3 border-b border-white/30">
            <img src="/icon2.png" alt="logo" width={40} height={40} />
            <h1 className="text-2xl font-medium">Focus | Planner</h1>
          </div>

          {/* naveMenu */}
          <div className="bg-yellow-400 w-full h-[90%] flex flex-col items-center pt-5 gap-3">
            <button className="bg-purple-400 w-[90%] h-[40px]">
              Dashboard
            </button>
            <button className="bg-purple-400 w-[90%] h-[40px]">
              Add Task
            </button>
            <button className="bg-purple-400 w-[90%] h-[40px]">
              View All Task
            </button>
          </div>
        </div>

        {/* content box */}
        <div className="bg-white w-[80%] h-full">right</div>
      </div>
    </>
  )
}

export default Focus
