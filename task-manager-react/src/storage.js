export function saveTasks(tasks) {
  try {
    const serializedTasks = JSON.stringify(tasks);
    localStorage.setItem('tasks', serializedTasks);
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
  }
}

export function loadTasks() {
  try {
    const serializedTasks = localStorage.getItem('tasks');
    if (serializedTasks === null) return [];
    return JSON.parse(serializedTasks);
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error);
    return [];
  }
}