import { saveTasks, loadTasks } from '../storage';

describe('Local Storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saves and loads tasks', () => {
    const tasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
    ];

    saveTasks(tasks);
    const loadedTasks = loadTasks();
    expect(loadedTasks).toEqual(tasks);
  });

  test('returns empty array when no tasks are saved', () => {
    const loadedTasks = loadTasks();
    expect(loadedTasks).toEqual([]);
  });
});