// Retrieve parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const budId = urlParams.get('budId');
const budSrc = urlParams.get('budSrc'); // Ensure budSrc is in the URL
const flowerType = urlParams.get('flowerType'); // Get flowerType from URL
const flowerImage = document.getElementById('flowerImage');

// Decode the budSrc and use it to display the flower image
if (budSrc) {
    flowerImage.src = decodeURIComponent(budSrc); // Decode the image source path
    flowerImage.style.display = 'block';
} else {
    console.error('No Flower Bud Image Source Provided');
    flowerImage.src = 'images/default_placeholder.png'; // Optional: Use a placeholder image if budSrc is missing
}

// Retrieve the flower buds from localStorage
let flowerBuds = JSON.parse(localStorage.getItem('flowerBuds')) || [];
let bud = flowerBuds[budId];

// Display the tasks
const taskList = document.getElementById('taskList');
const descriptionBox = document.createElement('div'); // Create the description box
descriptionBox.id = 'descriptionBox';
descriptionBox.classList.add('description-box');
document.body.appendChild(descriptionBox); // Add it to the document

// Add title and button to the description box
const taskTitle = document.createElement('h4'); // Task title element
const descriptionText = document.createElement('p');
const completeTaskButton = document.createElement('button');
completeTaskButton.innerText = 'Complete Task';
completeTaskButton.classList.add('complete-task-button');
descriptionBox.appendChild(taskTitle);
descriptionBox.appendChild(descriptionText);
descriptionBox.appendChild(completeTaskButton);

bud.tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `<label>${task.name}</label>`;
    taskList.appendChild(taskItem);

    // Event listener to show task description and "Complete Task" button
    taskItem.addEventListener('click', function() {
        taskTitle.innerText = task.name; // Display the task name in the description box
        descriptionText.innerText = task.description; // Set the description text
        descriptionBox.style.display = 'block'; // Show the description box
        completeTaskButton.disabled = task.completed; // Disable button if task is already completed
        
        completeTaskButton.onclick = function () {
            if (!task.completed) {
                // Mark task as completed and update completion
                bud.tasks[index].completed = true;
                updateCompletion();

                // Disable the button to prevent repeat clicks
                completeTaskButton.disabled = true;
            }

            // completeTaskButton.style.display = 'none'; // Hide button after completion
        };
    });
});

// Function to update completion status
function updateCompletion() {
    const totalTasks = bud.tasks.length;
    const completedTasks = bud.tasks.filter(task => task.completed).length;
    const completionPercentage = (completedTasks / totalTasks) * 100;

    // Update the completion message
    document.getElementById('completionMessage').innerText = `Completion: ${completionPercentage}%`;

    // Update the flower image based on completion percentage
    const flowerImage = document.getElementById('flowerImage');
    if (completionPercentage === 100) {
        flowerImage.src = `images/${flowerType}_100.png`; // 100% completion (unique per flower)
        flowerImage.style.width = '400px'; // Size for 100% completion
        flowerImage.style.height = '400px';

         // Show a button to navigate to the garden
         let gardenButton = document.getElementById('gardenButton');
         if (!gardenButton) {
             gardenButton = document.createElement('button');
             gardenButton.id = 'gardenButton';
             gardenButton.innerText = 'Garden';
             gardenButton.onclick = () => {
                 // Save the completed flower to the garden only when the button is pressed
                 let gardenFlowers = JSON.parse(localStorage.getItem('gardenFlowers')) || [];
                 gardenFlowers.push({
                     budId: budId,
                     budName: bud.budName,
                     budSrc: flowerImage.src,
                     flowerType: flowerType,
                     tasks: bud.tasks
                 });
                 localStorage.setItem('gardenFlowers', JSON.stringify(gardenFlowers));
 
                 // Remove the flower from the progress list
                 flowerBuds.splice(budId, 1);
                 localStorage.setItem('flowerBuds', JSON.stringify(flowerBuds));
 
                 // Redirect to garden.html
                 window.location.href = 'garden.html';
             };
             document.body.appendChild(gardenButton);
        }
    } else if (completionPercentage >= 75) {
        flowerImage.src = `images/${flowerType}_75.png`; // 75% completion (unique per flower)
        flowerImage.style.width = '300px'; // Size for 100% completion
        flowerImage.style.height = '300px';
    } else if (completionPercentage >= 50) {
        flowerImage.src = `images/50.png`; // 50% completion (shared image)
        flowerImage.style.width = '300px'; // Size for 100% completion
        flowerImage.style.height = '300px';
    } else if (completionPercentage >= 25) {
        flowerImage.src = `images/25.png`; // 25% completion (shared image)
        flowerImage.style.width = '300px'; // Size for 100% completion
        flowerImage.style.height = '300px';
    } else {
        flowerImage.src = `images/${flowerType}_Bud.png`; // Initial bud image (unique per flower)
        flowerImage.style.height= '100px';
        flowerImage.style.width= '100px';
        flowerImage.style.animation = 'drop 2s ease-out'; // The drop animation lasts 2 seconds
    }

    // Save the updated bud to localStorage
    flowerBuds[budId] = bud;
    localStorage.setItem('flowerBuds', JSON.stringify(flowerBuds));

}

// Initialize the completion state
updateCompletion();



