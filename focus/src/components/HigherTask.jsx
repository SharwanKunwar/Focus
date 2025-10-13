import { Badge, Button, Card, DatePicker, Empty, Form, Input, Modal, Popconfirm, Tag } from 'antd';
import { useState, useEffect } from 'react';
import '@ant-design/v5-patch-for-react-19';
import { usePlanner} from "../Store/usePlanner";
import moment from 'moment';
import Watch from './Watch';
import { motion } from "motion/react";

function HigherTask() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [time, setTime] = useState(0); // in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  


  const { tasks, addTask, deleteTask, setTasks, updateTaskStatus } = usePlanner();
  


  

  // Timer effect
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 10); // update every 10ms
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Format -> HH:MM:SS:MS
  const formatTime = (ms) => {
    if (typeof ms !== "number" || isNaN(ms)) return "00:00:00:00"; // prevent NaN

    const hrs = String(Math.floor(ms / 3600000)).padStart(2, "0");
    const mins = String(Math.floor((ms % 3600000) / 60000)).padStart(2, "0");
    const secs = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
    const millis = String(Math.floor((ms % 1000) / 10)).padStart(2, "0"); // two-digit ms

    return `${hrs}:${mins}:${secs}:${millis}`;
  };


  // Create Task
  const createTask = (value) => {
    value.status = "Pending";
    value.id = Date.now();
    value.createdAt = new Date().toISOString();
    value.taskCompletedAt = formatTime(time);
    addTask(value);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleWorkClose = () => {
    setStart(false);
    setIsRunning(false);
    setTime(0);
    setActiveTask(null);
  };

  const allDelete = () => {
    setTasks([]);
  };

  return (
    <>
      <div className="flex flex-col w-full h-full rounded-r-2xl relative">
        {/* Header */}
        <div className="flex justify-end items-center gap-5 p-5 bg-white/30 backdrop-blur-2xl sticky top-0 right-10 pr-10 mastShadow">
          <div className='w-6/8'>
            <h1 className='text-2xl font-medium text-neutral-600'>Higher Priority Tasks</h1>
          </div>
          <DatePicker placeholder='Select Date' size="middle" className='!bg-gradient-to-br !from-indigo-400 !to-cyan-400 !via-orange-300/50 !text-white !font-medium mastShadow'/>
          <Button onClick={() => setOpen(true)} className="!bg-gradient-to-br from-indigo-400 to-cyan-400 via-indigo-300 !text-white !font-medium !py-1 !px-3 !rounded-md mastShadow">
            <i className="ri-add-circle-line mr-0"></i>Add Task
          </Button>
          <Popconfirm title={ tasks.length === 0 ? "Nothing to delete!" : "Do you want to delete all tasks?" } onConfirm={allDelete}>
            <Button className="!bg-gradient-to-br from-indigo-400 to-cyan-400 via-indigo-300 !text-white !font-medium !py-1 !px-5 !rounded-md mastShadow">
              <i className="ri-delete-bin-2-line mr-0"></i>Delete All Task
            </Button>
          </Popconfirm>
        </div>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className='w-full h-full flex flex-col gap-15 justify-center items-center'>
            <Empty description="Task is not created yet!" className='scale-150 !text-[12px]'/>
            <Button onClick={() => setOpen(true)} className="mastShadow !bg-gradient-to-br from-indigo-400 to-cyan-400 via-orange-300/50 !text-white !font-medium !px-5 !rounded-md">
              <i className="ri-add-circle-line mr-0"></i>Create your first Task
            </Button>
          </div>
        )}

        {/* task card work here -------------------------------------------- Tasks Grid */}
        <div className="grid grid-cols-3 gap-7 p-5 overflow-y-auto">
          {tasks.map((item, index) => (
            <motion.div 
            initial={{scale:0,opacity:0, filter:"blure(10xp)"}}
            whileInView={{ scale:1,opacity:1}}
            transition={{duration:0.3}}
            className='bg-white h-[260px] rounded-md flex flex-col justify-between'>
              <Badge.Ribbon text="Higher" className='font-medium bg-gradient-to-br from-pink-400 to-purple-500 via-pink-400 mastShadow' key={index}>
              <Card hoverable className=' !h-[160px] !rounded-t-md !rounded-b-[5px]'>
                {
                  item.description.length > 200 
                    ? (
                        <Card.Meta 
                          title={item.title} 
                          description={item.description.slice(0, 200) + ' . . . '} 
                        />
                      )
                    : (
                        <Card.Meta 
                          title={item.title} 
                          description={item.description} 
                        />
                      )
                }                
              </Card>
            </Badge.Ribbon>

           {/* status / delete / date and time / start task  */}
            <div className=' h-[110px] px-3'>
              <div className='pt-3 mb-2 flex flex-col justify-between items-start'>
                  <div className='flex w-full justify-between'>
                    <div className='flex gap-2'>
                      {
                        item.status === "Pending" && (
                          <Tag className='capitalize mastShadow !bg-gradient-to-br from-indigo-400 to-pink-400 via-white font-medium'>{item.status}</Tag>
                        )
                      }
                      {
                        item.status === "InProgress" && (
                          <Tag className='capitalize mastShadow !bg-gradient-to-bl from-indigo-400 to-cyan-400 via-sky-300 font-medium'>{item.status}</Tag>
                        )
                      }
                      {
                        item.status === "Completed" && (
                          <Tag className='capitalize mastShadow !bg-gradient-to-bl from-green-500 to-green-400 via-pink-200 font-medium'>{item.status}</Tag>
                        )
                      }
                      <Tag onClick={() => deleteTask(item.id)} className='!bg-rose-500 !border-rose-500 !text-white mastShadow'>Delete</Tag>
                    </div>
                    <div>
                      <label className='text-neutral-400 text-[11px]'>{moment().format('DD MMM YYYY, h:mm a')}</label>
                    </div> 
                  </div>
                </div>

                {/* Start Task Button */}
                {item.status !== "Completed" ? (
                  <div className='mt-4 flex justify-center items-center'>
                    <Button
                      onClick={() => {
                        setActiveTask(item);
                        setStart(true);
                        setIsRunning(true);
                        updateTaskStatus(item.id, "InProgress");
                        item.status = "InProgress"
                      }}
                      size="medium"
                      className="mastShadow !bg-gradient-to-bl from-indigo-400 via-pink-300 to-indigo-400 !hover:bg-gradient-to-br !hover:from-indigo-400 !hover:via-cyan-400 !hover:to-purple-400 !text-white !font-medium w-[100%]  rounded-md hover:opacity-90 transition duration-300 border-none shadow-md"
                    >
                      Start Task
                    </Button>
                  </div>
                ):(
                  <div className='bg-gradient-to-bl from-indigo-400 via-pink-300 to-indigo-400 text-[15px] text-white font-medium rounded-md h-[32%] mt-4 mastShadow flex justify-center items-center'>
                    <h1>You completed task in {formatTime(item.taskCompletedAt)} good job.</h1>
                  </div>
                )}

            </div>
            </motion.div>
          ))}
        </div>

        {/* Create Task Modal */}
        <Modal open={open} footer={null} onCancel={handleClose} maskClosable={false}>
          <h1 className='text-lg font-medium mb-4'>New task</h1>
          <Form onFinish={createTask} form={form}>
            <Form.Item name="title" rules={[{ required: true }]}>
              <Input placeholder='Task name' size='large' className='mastShadow'/>
            </Form.Item>
            <Form.Item name="description" rules={[{ required: true }]}>
              <Input.TextArea placeholder='Task description' rows={5} className='mastShadow'/>
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit' type='primary' size='large' className='mastShadow !px-15'>Submit</Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Task Work Modal */}
        <Modal
          open={start}
          footer={null}
          onCancel={handleWorkClose}
          maskClosable={false}
          width="100%"
          style={{ top: 80, padding: 10 }}
          bodyStyle={{ padding: 0, height: "80vh" }}
          closable={true}
        >
          {activeTask && (
            <div className="w-full h-full flex items-center justify-center gap-2">
              {/* Left Panel */}
              <div className=' w-6/12 h-full'>
              {/* watch code  */}
              <motion.div
              initial={{filter:"blur(5px)"}}
              whileInView={{filter:"blur(0px)"}}
              transition={{delay:0.3, duration:0.3}}
               className=' h-[50%] w-full flex '>
                 <div className='w-6/12 h-6/6 flex justify-center items-center '>
                  <Watch />
                </div>

                <div className=' h-[100%] w-full flex justify-center items-center'>
                  {/* timer code  */}
                <div className='mt-1  px-3 flex flex-col gap-3 '>
                  <Card className='flex justify-center items-center mastShadow !bg-gradient-to-br from-indigo-400 to-pink-400 via-orange-400 !text-white !w-[380px] !h-[220px]'>
                    <div className='text-6xl flex justify-center items-center'>{formatTime(time)}</div>
                  </Card>
                  <Button
                    className="!px-10 !py-5 mastShadow !bg-gradient-to-br from-pink-400 to-orange-400 via-indigo-400 !text-white !font-medium !text-[16px]"
                    onClick={() => setIsRunning(prev => !prev)}
                  >
                    {isRunning ? "Stop Timer" : "Resume Timer"}
                  </Button>
                </div>
              </div>
                
              </motion.div>

              {/* take notes code  */}
              <motion.div
              initial={{filter:"blur(5px)"}}
              whileInView={{filter:"blur(0px)"}}
              transition={{delay:0.2, duration:0.3}}
              className='pt-3 mt-5 w-full h-[290px] pr-2 bg-gradient-to-br from-indigo-400 to-green-500 via-pink-400 rounded-md p-2'>
                <h1 className='text-2xl text-white font-medium mb-3 pl-2'>Write anything </h1>
                  <Form.Item name="description" rules={[{ required: true }]}>
                    <Input.TextArea placeholder='You can use this field for remember points or make notes' rows={8} className='mastShadow backdrop-blur-2xl opacity-60 font-medium !text-[17px]'/>
                  </Form.Item>
                </motion.div>

              </div>
             
              

              {/* Right Panel - Timer */}
              <div className=' w-6/12 h-full '>
                <motion.div
              initial={{filter:"blur(5px)"}}
              whileInView={{filter:"blur(0px)"}}
              transition={{delay:0.1, duration:0.3}}
                className='w-full h-6/12 pr-8 mt-5'>
                  <Card hoverable className='mastShadow !bg-gradient-to-br from-pink-400 to-orange-400 via-indigo-400 !text-white !font-medium !text-[16px]'>
                    <h1 className='text-2xl capitalize'>{activeTask.title}</h1>
                    <h3 className='mb-3 text-neutral-200'>{new Date(activeTask.createdAt).toLocaleString()}</h3>
                    <p className='mb-10  font-medium'>{activeTask.description}</p>
                    <div className='flex justify-between items-center'>
                      <label className='py-2 rounded-md font-medium text-start'>
                        <span>Status: </span>
                        <span className='font-bold'>{activeTask.status}</span>
                      </label>
                      <Button
                        className="!px-20 mastShadow !bg-gradient-to-br from-pink-400 to-orange-400 via-indigo-400 !text-white !backdrop-blur-2xl !font-medium !text-[16px]"
                        onClick={() => {
                          const completedAt = time; // the tracked time when task completes

                          updateTaskStatus(activeTask.id, "Completed", completedAt); // pass the time

                          setActiveTask(prev =>
                            prev ? { ...prev, status: "Completed", taskCompletedAt: completedAt } : prev
                          );

                          setIsRunning(false);
                          setStart(false);
                          setTime(0);
                        }}
                      >
                        Work Done
                      </Button>

                    </div>
                  </Card>
                </motion.div>
              </div>

        
            </div>
          )}
        </Modal>
      </div>
    </>
  );
}

export default HigherTask;
