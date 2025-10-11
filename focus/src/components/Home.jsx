import React from 'react'
import { Setbackground } from './ui/Setbackground'

function Home() {
  return (
    <>
     <div className="bg-sky-400 w-screen h-screen flex flex-col justify-centere items-start">
       <Setbackground/>
      </div>
    </>
  )
}

export default Home
