
import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import { Background } from "./Background";
import { Link } from 'react-router-dom'
import { Badge, Button, Card, DatePicker, Empty, Form, Input, Modal, Popconfirm, Tag } from 'antd';


export function Setbackground() {
    const [isMobile, setIsMobile] = useState(false);
    const [quote, setQuote] = useState("To Get Something You Never Had You Have To Do Something You Never Did.");
    const [quote1, setQuote1] = useState("One Sucess Can Fix 100 Regrets");
    const [quote2, setQuote2] = useState("The Magic You Are Looking For Is In The Work You Are Avoiding.");

    useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if(isMobile){
    return <p className="w-full h-full flex justify-center items-center text-2xl p-10 bg-gradient-to-br from-indigo-400 to-orange-400 via-pink-400 font-medium text-white">Mobile users beware — this site self-destructs on small screens 💥📱
The developer buried responsiveness six feet under 🪦💻</p>
  }else{

      
      return (
          <Background>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
        }}
        className="relative flex flex-col w-screen h-screen gap-4 items-center justify-center px-4 z-10">
          <Card hoverable>
       <div className="rounded-md backdrop-blur-2xl w-full h-[400px] flex flex-col justify-center items-center">
        <div className="w-[750px] h-[350px] flex justify-center items-center relative">
            <img src="/quoteBox3.png" alt="img" width={550} height={550} className=" object-center " />
            <h1 className="absolute w-[180px] h-[50px] top-10 bg-white text-neutral-400 font-medium flex justify-center items-center left-48 text-[12px]">{quote}</h1>
            <h1 className="absolute w-[150px] h-[30px] top-47 bg-white text-neutral-400 font-medium flex justify-center items-center left-46 text-[12px]">{quote1}</h1>
            <h1 className="absolute w-[190px] h-[50px] bottom-1 bg-white text-neutral-400 font-medium flex justify-center items-center left-65 text-[12px]">{quote2}</h1>
        </div>
        <div className="w-full h-[83px] text-end  leading-tight text-[13px] flex justify-end items-end text-neutral-400 gap-5">
            <Button>Facebook</Button>
            <Button>Github</Button>
            <Button>Linkdin</Button>
        </div>
       </div>
        </Card>

       <div className=" rounded-md w-6/12 h-[100px] flex justify-center items-start ">
        <Link to="/Focus" className="w-[400px] flex justify-center items-center "> <Button className="!bg-gradient-to-br mt-3 !from-white !to-white !via-sky-400 !hover:bg-gradient-to-bl !hover:font-bold !hover:text-white !hover:from-cyan-300 !hover:to-indigo-500 !hover:via-cyan-400 !font-medium !text-[18px] !font-mono !w-[250px] !h-[40px]">Plan Your Day</Button></Link>
       </div>
      </motion.div>
      <motion.div
      initial={{opacity:0, filter:"blur(10px)"}}
      whileInView={{opacity:1, filter:"blur(0px)"}}
      transition={{ delay:0.8, duration:0.5}}
      className="bg-white/30 absolute top-[8vh] w-[56vw] h-[80vh] rounded-xl right-[21.9vw] backdrop-blur-2xl mastShadow"></motion.div>
    </Background>
  );
}

}