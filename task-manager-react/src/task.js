export class Task {
  constructor(id, title, completed = false) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }

  toggleComplete() {
    this.completed = !this.completed;
    return this;
  }

  updateTitle(newTitle) {
    this.title = newTitle;
    return this;
  }
}

export function createTask(title) {
  return new Task(Date.now(), title);
}