import { useState } from 'react'

//custom hooks
import useLocalStorage from './hooks/useLocalStorage'

// custom components
import CustomForm from './components/CustomForm'
import TaskList from './components/TaskList'
import EditForm from './components/EditForm'
import ThemeSwitcher from './components/ThemeSwitcher'

function App() {
  const [tasks, setTasks] = useLocalStorage('react-to-do', []);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task])
  }

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter((prevTask) =>
      prevTask.id !== id
    ))
  }

  //Close the edit mode

  const enterEditMode = (task) => {
    setEditedTask(task)
    setIsEditing(true)
    setPreviousFocusEl(document.activeElement)
  }

  //Close the edit mode
  
  const closeEditMode = () => {
    setIsEditing(false)
    previousFocusEl.focus()
  }

  const updateTask = (task) => {
    setTasks(prevState => prevState.map((prevTask) => (
      prevTask.id === task.id ? { ...prevTask, name: task.name} : prevTask
    )))

    //Close the edit mode
    
    closeEditMode()
  }

  const toggleTask = (id) => {
    setTasks(prevState => prevState.map((prevTask) => (
      prevTask.id === id ? { ...prevTask, checked: !prevTask.checked } : prevTask
    )))
  }

  return (
    <div className="container">
      <header>
        <h1>My Task List</h1>
      </header>

      {
        isEditing && (
          <EditForm
            editedTask={editedTask}
            updateTask={updateTask}
            closeEditMode={closeEditMode}
          />
        )
      }

      <CustomForm addTask={addTask} />
      {tasks && (<TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        updateTask={updateTask}
        toggleTask={toggleTask}
        enterEditMode={enterEditMode}
      />)}

        <ThemeSwitcher/>

    </div>
  )
}

export default App
