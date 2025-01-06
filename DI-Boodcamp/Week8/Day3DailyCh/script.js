const tasks = [];

const form = document.getElementById('form');
const userInput = document.getElementById('inputField');
const taskContainer = document.querySelector('.listTasks');

function addTask(event) {
    event.preventDefault(); 

    const inputText = userInput.value.trim();

    if (inputText === "") {
        return; 
    }

    
    const task = { id: Date.now(), text: inputText };

    
    tasks.push(task);

   
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-item');
    taskDiv.setAttribute('data-id', task.id); 

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const label = document.createElement('label');
    label.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-times"></i>'; 
    deleteButton.addEventListener('click', () => deleteTask(task.id));

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(label);
    taskDiv.appendChild(deleteButton);

    taskContainer.appendChild(taskDiv);

    userInput.value = '';
}

function deleteTask(taskId) {
 
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
    }

    const taskDiv = document.querySelector(`.task-item[data-id="${taskId}"]`);
    if (taskDiv) {
        taskDiv.remove();
    }
}

form.addEventListener('submit', addTask);