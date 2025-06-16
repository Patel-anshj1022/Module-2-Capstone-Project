import { Task, createTask } from '../task';

describe('Task Model', () => {
  test('should create a new task', () => {
    const task = new Task(1, 'Test Task');
    expect(task.id).toBe(1);
    expect(task.title).toBe('Test Task');
    expect(task.completed).toBe(false);
  });

  test('should toggle completed status', () => {
    const task = new Task(1, 'Test Task');
    task.toggleComplete();
    expect(task.completed).toBe(true);
    task.toggleComplete();
    expect(task.completed).toBe(false);
  });

  test('should update title', () => {
    const task = new Task(1, 'Test Task');
    task.updateTitle('New Title');
    expect(task.title).toBe('New Title');
  });

  test('createTask should generate a task with current timestamp as id', () => {
    const before = Date.now();
    const task = createTask('New Task');
    const after = Date.now();
    expect(task.id).toBeGreaterThanOrEqual(before);
    expect(task.id).toBeLessThanOrEqual(after);
    expect(task.title).toBe('New Task');
  });
});