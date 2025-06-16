import { fetchTasks, addTask, updateTask, deleteTask } from '../api';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ id: 1, title: 'Test Task', completed: false }]),
  })
);

describe('API Functions', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('fetchTasks makes a GET request', async () => {
    const tasks = await fetchTasks();
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos');
    expect(tasks).toEqual([{ id: 1, title: 'Test Task', completed: false }]);
  });

  test('addTask makes a POST request', async () => {
    const newTask = { title: 'New Task', completed: false };
    await addTask(newTask);
    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });
});