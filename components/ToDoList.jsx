// import React from 'react';
// import styles from './TodoList.module.css';

// function TaskList() {
//     const [tasks, setTasks] = React.useState([]);
//     const [newTask, setNewTask] = React.useState('');
  
//     React.useEffect(() => {
//       const savedTasks = localStorage.getItem('tasks');
//       if (savedTasks) {
//         setTasks(JSON.parse(savedTasks));
//       }
//     }, []);
  
//     React.useEffect(() => {
//       localStorage.setItem('tasks', JSON.stringify(tasks));
//     }, [tasks]);
  
//     const addTask = () => {
//       if (newTask.trim() !== '') {
//         const newTaskObj = { text: newTask, completed: false };
//         setTasks([...tasks, newTaskObj]);
//         setNewTask('');
//       }
//     };
  
//     const deleteTask = (index) => {
//       const newTasks = tasks.filter((_, i) => i !== index);
//       setTasks(newTasks);
//     };
  
//     const toggleTaskCompletion = (index) => {
//       const newTasks = tasks.map((task, i) =>
//         i === index ? { ...task, completed: !task.completed } : task
//       );
//       setTasks(newTasks);
//     };
  
//     return (
//       <div className={styles.TaskList}>
//         <h1 className={styles.taskListTitle}>Список дел</h1>
//         <div className={styles.addTask}>
//           <input
//             type="text"
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)}
//             placeholder="Новая задача..."
//             className={styles.addTaskInput}
//           />
//           <button onClick={addTask} className={styles.addButton}>Добавить</button>
//         </div>
//         <ul className={styles.tasks}>
//           {tasks.map((task, index) => (
//             <li key={index} className={`${styles.task} ${task.completed ? 'completed' : ''}`}>
//               <input
//                 type="checkbox"
//                 checked={task.completed}
//                 onChange={() => toggleTaskCompletion(index)}
//               />
//               <span>{task.text}</span>
//               <span className={styles.deleteIcon} 
//               onClick={() => deleteTask(index)}>           
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
  
//   ReactDOM.createRoot(document.getElementById('root')).render(<TaskList />);

//   export default TaskList;



import React from 'react';
import styles from './ToDoList.module.css'


function TaskList() {
  const [tasks, setTasks] = React.useState([]);
  const [newTask, setNewTask] = React.useState('');

  React.useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj = { text: newTask, completed: false };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  return (
    <div className={styles['task-list']}>
      <h1 className={styles['task-list-title']}>Список дел</h1>
      <div className={styles['add-task']}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Новая задача..."
          className={styles['add-task-input']}
        />
        <button onClick={addTask} className={styles['add-button']}>Добавить</button>
      </div>
      <ul className={styles['tasks']}>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`${styles['task']} ${task.completed ? styles['completed'] : ''}`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
            />
            <span>{task.text}</span>
            <span
              className={styles['delete-icon']}
              onClick={() => deleteTask(index)}
            >
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;