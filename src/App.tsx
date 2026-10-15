import { useEffect, useState } from 'react'
import type { Task, TaskStatus } from './models/Task.ts'

import './App.css'
import './components/TaskCard.css'
import TaskForm from './components/TaskForm.tsx'
import './components/TaskForm.css'
import TaskCard from './components/TaskCard.tsx'



function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTask = localStorage.getItem("tasks"); //if string corrupt  -> crash:

    try {
      return savedTask ? JSON.parse(savedTask) : []; // -> parse 
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks)) //always executed when tasks change
  }, [tasks])


  const [editTask, setEditTask] = useState<Task | undefined>(undefined)
  const [showForm, setShowForm] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>('todo')
  const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null)



  function saveTask(
    title: string,
    description: string,
    status: TaskStatus
  ) {
    if (editTask === undefined) {
      const newTask: Task = {
        id: Date.now() + Math.random(), //unusual rather use crypto.randomUUID() -> string
        title,
        description,
        status
      }
      setTasks(currentTasks => [...currentTasks, newTask])
    } else {
      setTasks(currentTasks =>
        currentTasks.map(task =>
          task.id === editTask.id
            ? {
              ...task,
              title,    //override title
              description,
              status
            }
            : task
        )
        // task.id === editTask.id
        // ? use task, & override 
        // : oldTask
      )
    }

    setShowForm(false)
    setEditTask(undefined)
  }


  function deleteTask(idToDelete: number) {
    setTasks(currentTasks => currentTasks.filter(task => task.id !== idToDelete))
  }
  function changeTask(id: number) {
    const taskToEdit = tasks.find(task => task.id === id)
    setEditTask(taskToEdit)
    setShowForm(true)

  }

  function handleDragStart(id: number) {
    setDraggedTaskId(id)
  }

  function handleDrop(status: TaskStatus) {
    if (draggedTaskId === null) return
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === draggedTaskId
          ? {
            ...task,
            status
          }
          : task
      )
    )

    setDraggedTaskId(null)
  }

  return (
    <div className='body'>
      {showForm && <TaskForm
        chosenTask={editTask}
        selectedStatus={selectedStatus}
        onClose={() => {
          setShowForm(false)
          setEditTask(undefined)
        }}
        onSave={saveTask} />}


      <h2>Kanban-Board</h2>
      <div className='swimlanes'>
        <div className='todoLane Lane'
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop("todo")}
        >
          <div className='header todo'>
            <h2>To Do</h2>
          </div>
          <TaskCard tasks={tasks} status={'todo'} deleteTask={(id) => deleteTask(id)} changeTask={changeTask} onDragStart={handleDragStart} />

          <div className='newCardButton'>
            <button onClick={() => {
              setShowForm(true)
              setSelectedStatus('todo')
            }}> create Task </button>
          </div>
        </div>
        <div className='inProgressLane Lane'
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop("inProgress")}
        >
          <div className='header inProgress'>
            <h2>In Progress</h2>
          </div>
          <TaskCard tasks={tasks} status={'inProgress'} deleteTask={(id) => deleteTask(id)} changeTask={changeTask} onDragStart={handleDragStart} />

          <div className='newCardButton'>
            <button onClick={() => {
              setShowForm(true)
              setSelectedStatus('inProgress')
            }}> create Task </button>
          </div>
        </div>
        <div className='doneLane Lane'
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop("done")}
        >
          <div className='header done'>
            <h2>Done</h2>
          </div>

          <TaskCard tasks={tasks} status={'done'} deleteTask={(id) => deleteTask(id)} changeTask={changeTask} onDragStart={handleDragStart} />
          <div className='newCardButton'>
            <button onClick={() => {
              setShowForm(true)
              setSelectedStatus('done')
            }}> create Task </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App;
