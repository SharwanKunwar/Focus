import {create} from 'zustand'
import {persist} from 'zustand/middleware'
export const useMediumPlanner = create(persist(
    (set)=>({
        tasks:[],
        addTask: (payload) => set((pastData)=>({
            tasks: [...pastData.tasks, payload]
        })),
        deleteTask: (id)=>set((state)=>({
            tasks: state.tasks.filter((task)=> task.id !== id)
        })),
        setTasks: (newTasks) =>
        set(() => ({
          tasks: newTasks,
        })),
    
    }),
    {name:"Medium"}
))