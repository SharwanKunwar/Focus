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
  "Your tasks are waiting… like tiny executioners ready to pounce the moment you look away. Delay too long and they’ll haunt your dreams with guilt you can’t escape.",
  "Chaos is mandatory. Survive if you can. Every undone task is a little demon laughing at you while you scroll aimlessly through cat videos and pretend you’re busy.",
  "Remember: procrastination is a horror story starring you as the unlucky victim. Every moment you delay, your to-do list multiplies like an army of ghosts plotting revenge.",
  "Procrastinate now, panic later. The panic is deliciously dark, creeping into every corner of your mind while the tasks sit silently, judging your life choices.",
  "Your deadlines are breathing down your neck. They enjoy it. Each tick of the clock is a sinister reminder that your comfort today is tomorrow’s nightmare.",
  "Work hard, or your future self will haunt you forever. Each ignored task leaves a scar on your soul, whispering 'why didn’t you finish me when you could?'",
  "Every undone task is a ghost whispering 'why me?' in your ear. Ignore them, and they’ll start screaming at 3 a.m., turning your calm night into chaos.",
  "The to-do list grows while your soul shrinks. Each item is a little horror waiting for the moment you dare to close your eyes, laughing at your delay.",
  "Tasks today, nightmares tonight. Each unchecked box multiplies in the shadows, plotting subtle revenge on your peace of mind while you sip coffee.",
  "The more you delay, the more thrilling the chaos becomes. Procrastination is just suspense; your anxiety is the main character in this thriller.",
  "Your productivity is like a horror movie—plot twist every minute. Just when you think you’re safe, another task jumps out from behind the shadows.",
  "Failure is permanent; excuses are temporary. Every excuse you make is just fuel for the growing army of undone tasks that will chase you relentlessly.",
  "The clock ticks. So do your regrets. Each second lost to distraction is a demon added to your list, grinning as you scroll past memes instead of working.",
  "Your tasks are cute… until they turn into monsters. Leave them too long and they’ll start gnawing at your peace, laughing at your weak defenses.",
  "Smile! Your procrastination is making history… sadly, it’s the history of chaos, stress, and unfinished dreams, all starring you in the leading role.",
  "Deadlines are vampires. They suck slowly but surely, draining your energy, feeding off your hesitation, leaving you pale and terrified of tomorrow.",
  "Every ignored task is a curse cast on your free time. They linger, grow stronger, and one day strike back when you least expect it, with terrifying force.",
  "The more you scroll, the more your tasks laugh. Every minute wasted is a giggle in the dark, echoing through your list of unfinished horrors.",
  "Sleep tight… your unfinished work is plotting against you. While you dream, it gathers strength, preparing to ambush you at the break of dawn with guilt.",
  "Productivity is optional. Panic is mandatory. Every delay adds weight to your soul, dragging you into a shadowy spiral of 'what could have been.'",
  "Your to-do list whispers, ‘we are always watching.’ Ignore it, and it starts to scream, a chorus of little horrors reminding you that peace is temporary.",
  "The longer you wait, the scarier it gets. Tasks mutate in your absence, growing claws, fangs, and subtle ways to make your life slightly more miserable every day.",
  "Tasks are like zombies; they don’t die until you handle them. Delay too long, and you’ll be surrounded, chased, and cornered by a horde of tiny horrors.",
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
