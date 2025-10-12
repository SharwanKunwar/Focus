import { Badge, Button, Card, DatePicker, Empty, Form, Input, Modal, Popconfirm, Tag } from 'antd'
import { useState } from 'react';
import '@ant-design/v5-patch-for-react-19';
import { useLowerPlanner } from '../Store/useLowerPlanner';
import moment from 'moment';


function LowerTask() {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const{tasks, addTask, deleteTask, setTasks} = useLowerPlanner();

     

  const createTask = (value) =>{
    value.status = "Pending"
    value.id = Date.now();
    value.createdAt = new Date() 
    addTask(value)
    handleColse();
  }
  const handleColse = () =>{
    setOpen(false);
    form.resetFields()
  }
  const allDelete = () =>{
    setTasks([]);
  }

  return (
    <>
      <div className="flex flex-col w-full h-full rounded-r-2xl relative ">
        <div className="flex justify-end items-center gap-5 p-5 bg-white/30 backdrop-blur-2xl sticky top-0 right-10 pr-10 mastShadow">
        <div className='w-6/8'><h1 className='text-2xl font-medium text-neutral-600'>Lower Priority Tasks</h1></div>
          <DatePicker placeholder='Select Date' size="middle" className='!bg-gradient-to-br !from-indigo-400 !to-cyan-400 !via-orange-300/50 !text-white !font-medium mastShadow'/>
          <Button onClick={()=>setOpen(true)} className="!bg-gradient-to-br from-indigo-400 to-cyan-400 via-orange-300/50 !text-white !font-medium !py-1 !px-3 !rounded-md mastShadow"><i className="ri-add-circle-line mr-0"></i>Add Task</Button>
          <Popconfirm  title={ tasks.length === 0 ? "Are you crazy there is nothing to delete": "Do you want to delete all tasks ?" } onConfirm={allDelete} >
            <Button className="!bg-gradient-to-br from-indigo-400 to-cyan-400 via-orange-300/50 !text-white !font-medium !py-1 !px-5 !rounded-md mastShadow"><i className="ri-delete-bin-2-line mr-0"></i>Delete All Task</Button>
          </Popconfirm>
            
        </div>

        {
            tasks.length === 0 && (
              <div className='w-full h-full flex flex-col gap-15 justify-center items-center'>
                <Empty description="Task is not created yet !!!" className='scale-150 !text-[12px]'/>
                <Button onClick={()=>setOpen(true)} className="mastShadow !bg-gradient-to-br from-indigo-400 to-cyan-400 via-orange-300/50 !text-white !font-medium !px-5 !rounded-md "><i className="ri-add-circle-line mr-0"></i>Create your first Task</Button>
              </div>
            )
          }

        {/* scrollable grid area */}
        <div className="grid grid-cols-3 gap-7 p-5 overflow-y-auto">
          
          {tasks.map((item, index) => (
            <Badge.Ribbon text="Lower" className='font-medium bg-gradient-to-br from-pink-400 to-purple-500 via-pink-400 mastShadow' key={index}>
              <Card hoverable>
                <Card.Meta
                title={item.title}
                description={item.description}
                ></Card.Meta>
                <div className='mt-5 flex flex-col justify-between items-start '>
                  <div className='flex w-full justify-between '>
                    <div>
                      <Tag className='capitalize mastShadow'>{item.status}</Tag>
                      <Tag onClick={()=>deleteTask(item.id)} className='!bg-rose-500 !border-rose-500 !text-white mastShadow'>Delete</Tag>
                    </div>
                    <div>
                      <Button size="small" className="mastShadow !bg-gradient-to-br from-indigo-400 via-cyan-400 to-purple-400 !text-white !font-medium !px-10 rounded-md hover:opacity-90 transition duration-300 border-none shadow-md">Start Task</Button>
                    </div>
                  </div>

                  <div className='w-full mt-1'>
                    <label className='text-neutral-400 text-[11px]'>{moment().format('DD MMM YYYY, h:mm a')}</label>
                  </div>

                </div>
                
              </Card>
            </Badge.Ribbon>
          ))}
          
        </div>




        <Modal open={open} footer={null} onCancel={handleColse} maskClosable={false}>
          <h1 className='text-lg font-medium mb-4'>New task</h1>
          <Form onFinish={createTask} form={form}>
            <Form.Item
              name="title"
              rules={[{required: true}]}
            >
              <Input placeholder='Task name' size='large' className='mastShadow'/>
            </Form.Item>

            <Form.Item
            name="description"
            rules={[{required: true}]}
            >
              <Input.TextArea placeholder='Task name' rows={5} className='mastShadow'/>
            </Form.Item>

            <Form.Item>
              <Button htmlType='submit' type='primary' size='large' className='mastShadow !px-15'>Submit</Button>
            </Form.Item>
          </Form>

        </Modal>

      </div>
    </>
  )
}

export default LowerTask
