import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router'
import 'remixicon/fonts/remixicon.css'
import { Button, Modal, Select } from 'antd'
import { useAuthPlanner } from "../Store/useAuthPlanner";

function Focus() {
  const { auth } = useAuthPlanner();
  const navigate = useNavigate();

  // Fun dark-humor messages for the modal
  const messages = [
    "Your tasks are waiting… like tiny executioners.",
    "Chaos is mandatory. Survive if you can.",
    "Remember: procrastination is a horror story, starring you.",
  ];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  // Initialize modal based on sessionStorage
  const [welcomeMsgOpen, setWelcomeMsgOpen] = useState(() => {
    return !sessionStorage.getItem('hasSeenWelcome');
  });

  const handleWelcomeClose = () => {
    setWelcomeMsgOpen(false);
    sessionStorage.setItem('hasSeenWelcome', 'true'); // mark as seen
  }

  return (
    <div className="bg-gradient-to-br from-pink-300 to-orange-400 via-cyan-500 w-screen h-screen flex p-3">
      
      {/* Sidebar */}
      <div className="bg-white/70 backdrop-blur-2xl w-[20%] h-full rounded-l-2xl text-white">
        {/* Logo and site name */}
        <div className=" w-full h-[10.3%] flex justify-center items-center gap-3 border-b border-black/30 mastShodow">
          <div className='bg-gradient-to-br from-white to-cyan-100 via-pink-100 rounded-md p-1 mastShadow mr-3'>
            <img src="/icon2.png" alt="logo" width={40} height={40} />
          </div>
          <h1 className="text-2xl font-medium text-black">Focus Planner</h1>
        </div>

        {/* Navigation */}
        <div className="w-full h-[90%] flex flex-col items-center pt-5 gap-3">
          <div className='w-full h-full flex flex-col items-center gap-3'>
            <Link to="dashboard" className='w-full flex justify-center items-center'>
              <Button size='large' className="mastShadow !bg-gradient-to-bl from-indigo-400 via-pink-300 to-indigo-400 !hover:bg-gradient-to-br !hover:from-indigo-400 !hover:via-cyan-400 !hover:to-purple-400  !text-[18px] w-[90%] h-[40px] rounded-md">
                <i className="ri-dashboard-line mr-1"></i> Progress Board
              </Button>
            </Link>

            <Select
              placeholder="View All Task"
              size="large"
              className="w-[90%] text-center font-medium !border-none !outline-none mastShadow !rounded-lg"
              onChange={(value) => navigate(value)}
            >
              <Select.Option value="higher">Higher Priority Task</Select.Option>
              <Select.Option value="medium">Medium Priority Task</Select.Option>
              <Select.Option value="lower">Lower Priority Task</Select.Option>
            </Select>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="bg-white/30 backdrop-blur-2xl w-[80%] h-full rounded-r-2xl mastShadow relative overflow-y-auto">
        <Outlet />
      </div>

      {/* Welcome Modal */}
      <Modal
        open={welcomeMsgOpen}
        footer={null}
        maskClosable={false}
        onCancel={handleWelcomeClose}
        centered
        className="p-4"
      >
        <div className="flex flex-col gap-4">
          <h1 className='text-[20px] font-semibold text-gray-800'>
            Brace yourself, {auth.username} 😏
          </h1>
          <p className='mt-2 text-gray-600 leading-relaxed'>
            {randomMessage}
          </p>
          <Button type="primary" onClick={handleWelcomeClose}>
            Start Work
          </Button>
        </div>
      </Modal>

    </div>
  )
}

export default Focus
