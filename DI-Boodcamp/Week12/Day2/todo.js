export class TodoList {
    constructor() {
      this.tasks = [];
    }

    addTask(task) {
      this.tasks.push({ task, completed: false });
    }
  
    markAsComplete(index) {
      if (this.tasks[index]) {
        this.tasks[index].completed = true;
      }
    }
    
    listTasks() {
      return this.tasks.map((task, index) => {
        return `${index + 1}. ${task.task} - ${task.completed ? 'Completed' : 'Pending'}`;
      }).join('\n');
    }
  }