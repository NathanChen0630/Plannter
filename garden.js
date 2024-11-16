// Retrieve stored garden flowers from localStorage
let gardenFlowers = JSON.parse(localStorage.getItem('gardenFlowers')) || [];

// Function to display flowers in the garden
function displayGardenFlowers() {
    const gardenGrid = document.getElementById('gardenGrid');
    gardenGrid.innerHTML = ''; // Clear the grid before adding flowers

    // Loop through the garden flowers and display them
    gardenFlowers.forEach((flower, index) => {
        // Create a flower container div
        const flowerContainer = document.createElement('div');
        flowerContainer.classList.add('garden-flower');
        
        // Add the flower image
        const flowerImg = document.createElement('img');
        flowerImg.src = decodeURIComponent(flower.budSrc || 'images/default_placeholder.png'); // Default if budSrc is missing
        flowerImg.alt = flower.budName || 'Unknown Flower';
        flowerImg.classList.add('flower-image');

        // Add the flower name
        const flowerName = document.createElement('span');
        flowerName.innerText = flower.flowerType || 'Unknown';
        flowerName.classList.add('flower-name');

        // Append the image and name to the container
        flowerContainer.appendChild(flowerImg);
        flowerContainer.appendChild(flowerName);

        // Add click event to show tasks and description
        flowerContainer.addEventListener('click', function() {
            const taskDetails = flower.tasks.map(task => `- ${task.name}: ${task.description}`).join('\n');
            alert(`Flower: ${flower.budName}\nTasks:\n${taskDetails}`);
        });

        flowerContainer.addEventListener('contextmenu', function() {
            event.preventDefault(); // Prevent the default right-click menu

            const confirmDelete = confirm(`Do you want to delete the flower: ${flower.flowerType}?`);
            if (confirmDelete) {
                // Remove the flower from the gardenFlowers array
                gardenFlowers.splice(index, 1);

                // Update localStorage
                localStorage.setItem('gardenFlowers', JSON.stringify(gardenFlowers));

                // Refresh the garden display
                displayGardenFlowers();
            }
        });

        // Append the container to the garden grid
        gardenGrid.appendChild(flowerContainer);
    });
}

// Initialize the garden display
displayGardenFlowers();


