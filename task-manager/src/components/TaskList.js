import React from 'react';
import Task from './Task';

function TaskList({ tasks, toggleTask, deleteTask, editTask }) {
  return (
    <ul className="task-list">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))
      ) : (
        <li className="empty">No tasks yet. Add one above!</li>
      )}
    </ul>
  );
}

export default TaskList;