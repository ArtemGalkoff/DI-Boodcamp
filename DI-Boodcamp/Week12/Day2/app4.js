import { TodoList } from './todo.js';

const myTodoList = new TodoList();


myTodoList.addTask('Buy groceries');
myTodoList.addTask('Finish homework');
myTodoList.addTask('Clean the house');

myTodoList.markAsComplete(1); 

console.log('Todo List:');
console.log(myTodoList.listTasks());