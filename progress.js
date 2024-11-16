// Maximum number of flower pots allowed
const MAX_POTS = 8;

// Retrieve stored flower buds and tasks from localStorage
let flowerBuds = JSON.parse(localStorage.getItem('flowerBuds')) || [];

// Function to display flower pots
function displayFlowerPots() {
    const flowerGrid = document.getElementById('flowerGrid');
    flowerGrid.innerHTML = ''; // Clear the grid before adding new pots

    // Loop through the flower buds and create a pot for each one (up to 8)
    flowerBuds.forEach((bud, index) => {
        if (index >= MAX_POTS) return; // Limit to 8 pots

        // Create a flower pot div
        const flowerPot = document.createElement('div');
        flowerPot.classList.add('flower-pot');
        flowerPot.dataset.id = index; // Use index as id for simplicity

        // Add the flower name at the bottom of the pot
        const flowerName = document.createElement('span');
        flowerName.innerText = bud.flowerType;
        flowerName.classList.add('flower-name'); // Add a class instead of inline styling

        flowerPot.appendChild(flowerName);

        // Make the flower pot clickable for interaction (left-click to view details)
        flowerPot.addEventListener('click', function() {
            const budId = flowerPot.dataset.id; // Get the flower pot's dataset id
            const bud = flowerBuds[budId]; // Assuming flowerBuds is an array or object where you're storing flower bud info
            const budSrc = bud.budSrc; // Get the bud image source
            const flowerType = bud.flowerType; // Get the flower type (e.g., Rose, Tulip)
        
            // Navigate to plannt.html with budId, budSrc, and flowerType as URL parameters
            window.location.href = `plannt.html?budId=${budId}&budSrc=${encodeURIComponent(budSrc)}&flowerType=${encodeURIComponent(flowerType)}`;
        });

        // Right-click to delete the flower pot
        flowerPot.addEventListener('contextmenu', function(event) {
            event.preventDefault(); // Prevent the default right-click menu

            // Confirm deletion
            const confirmDelete = confirm(`Do you want to delete the flower bud: ${bud.budName}?`);
            if (confirmDelete) {
                // Remove the bud from the array
                flowerBuds.splice(index, 1);

                // Update localStorage
                localStorage.setItem('flowerBuds', JSON.stringify(flowerBuds));

                // Refresh the display
                displayFlowerPots();
            }
        });

        // Append the pot to the grid
        flowerGrid.appendChild(flowerPot);
    });
}

// Call the function to display flower pots when the page loads
window.onload = displayFlowerPots;



