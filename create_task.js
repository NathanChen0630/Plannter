// Retrieve parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const budId = urlParams.get('budId');
const budName = urlParams.get('budName');
const budSrc = urlParams.get('budSrc');
const flowerType = urlParams.get('flowerType');

// Check if budName or budSrc exist before displaying
if (budName) {
    document.getElementById('budDetails').innerText = `${budName}`;
} else {
    document.getElementById('budDetails').innerText = 'No Flower Bud Name Provided';
}

if (budSrc) {
    const flowerImage = document.getElementById('flowerImage');
    flowerImage.src = decodeURIComponent(budSrc);
    flowerImage.style.display = 'block';
} else {
    console.error('No Flower Bud Image Source Provided');
}

// Array to store tasks (with name and description)
let tasks = [];

// Function to display tasks (only showing the task name)
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear the task list

    // Loop through tasks and display their names
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <strong>${task.name}</strong>`;
        taskList.appendChild(taskItem);
    });
}

// Event listener for the Add Task button
document.getElementById('addTaskButton').addEventListener('click', function() {
    // Check if the number of tasks has reached the limit of 10
    if (tasks.length >= 10) {
        alert('Maximum Task is 10');
        return;
    }

    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;

    // Validate input
    if (taskName === '' || taskDescription === '') {
        alert('Please fill in both the task name and description');
        return;
    }

    // Create new task object (with name and description, but only name is displayed)
    const newTask = {
        name: taskName,
        description: taskDescription // The description is not displayed but stored
    };

    // Add new task to the tasks array
    tasks.push(newTask);

    // Clear input fields after adding the task
    document.getElementById('taskName').value = '';
    document.getElementById('taskDescription').value = '';

    // Update task list display
    displayTasks();
});

// Event listener for the Delete button (remove the last task)
document.querySelector('button[style="margin-left: 170px;"]').addEventListener('click', function() {
    if (tasks.length === 0) {
        alert('No tasks to delete');
        return;
    }

    // Remove the last task from the array
    tasks.pop();

    // Update task list display
    displayTasks();
});

// Event listener for the Finish button to store data and navigate to progress.html
document.getElementById('select_button').addEventListener('click', function() {
    const budName = document.getElementById('budDetails').innerText;

    // Check if there are at least 4 tasks added before finishing
    if (tasks.length < 4) {
        alert('You must add at least 4 tasks before finishing.');
        return; // Return early to stop the function and prevent the redirection
    }

    // Store the flower bud data in localStorage
    let flowerBuds = JSON.parse(localStorage.getItem('flowerBuds')) || [];
    
    // Create a new flower bud object with all necessary details
    const newBud = {
        budId: budId,              // Flower type or ID
        budName: budName,          // Flower name
        budSrc: budSrc,            // Flower image source
        flowerType: flowerType,    // Flower type for different flower growth stages
        tasks: tasks               // List of tasks added by the user
    };
    
    // Add the new flower bud to the list
    flowerBuds.push(newBud);

    // Save the updated list back to localStorage
    localStorage.setItem('flowerBuds', JSON.stringify(flowerBuds));

    // Redirect to progress.html
    window.location.href = 'progress.html';
});

// Character count functionality
const taskDescription = document.getElementById('taskDescription');
const charCount = document.getElementById('charCount');

taskDescription.addEventListener('input', function() {
    const remaining = 350 - taskDescription.value.length;
    charCount.innerText = `${remaining} characters remaining`;
});

