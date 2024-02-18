// component import
import TaskItem from './TaskItem';

// styles
import styles from './TaskList.module.css';

const TaskList = ({tasks, deleteTask, updateTask, toggleTask, enterEditMode}) => {
  return (
    <ul className={styles.tasks}>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          updateTask={updateTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      ))
      }
    </ul>
  )
}
export default TaskList