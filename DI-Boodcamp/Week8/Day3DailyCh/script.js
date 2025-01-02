const tasks = [];

// Get elements
const form = document.getElementById('form');
const userInput = document.getElementById('inputField');
const taskContainer = document.querySelector('.listTasks');

// Function to add a task
function addTask(event) {
    event.preventDefault(); // Prevent form submission

    const inputText = userInput.value.trim(); // Get the input value and trim extra spaces

    if (inputText === "") {
        return; // If the input is empty, do nothing
    }

    // Create task object with task text
    const task = { id: Date.now(), text: inputText };

    // Add the task to the array
    tasks.push(task);

    // Create DOM elements for the new task
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-item');
    taskDiv.setAttribute('data-id', task.id); // Add a unique data-id for each task

    // Create the checkbox input
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // Create the label with the task text
    const label = document.createElement('label');
    label.textContent = task.text;

    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-times"></i>'; // Font Awesome "X" icon
    deleteButton.addEventListener('click', () => deleteTask(task.id));

    // Append elements to the taskDiv
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(label);
    taskDiv.appendChild(deleteButton);

    // Append the taskDiv to the taskContainer
    taskContainer.appendChild(taskDiv);

    // Clear the input field
    userInput.value = '';
}

// Function to delete a task
function deleteTask(taskId) {
    // Remove the task from the array
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
    }

    // Remove the task from the DOM
    const taskDiv = document.querySelector(`.task-item[data-id="${taskId}"]`);
    if (taskDiv) {
        taskDiv.remove();
    }
}

// Add event listener to the form
form.addEventListener('submit', addTask);