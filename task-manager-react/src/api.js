const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export async function fetchTasks() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    const data = await response.json();
    return data.slice(0, 5); // Limit to 5 for demo
  } catch (error) {
    throw new Error('Network error: ' + error.message);
  }
}

export async function addTask(task) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: task.title,
        completed: task.completed,
        userId: 1,
      }),
    });
    if (!response.ok) throw new Error('Failed to add task');
    return await response.json();
  } catch (error) {
    throw new Error('Network error: ' + error.message);
  }
}

export async function updateTask(id, updates) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return await response.json();
  } catch (error) {
    throw new Error('Network error: ' + error.message);
  }
}

export async function deleteTask(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
  } catch (error) {
    throw new Error('Network error: ' + error.message);
  }
}