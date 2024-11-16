
// Maximum number of flower pots allowed
const MAX_POTS = 8;

// Event listener for the "Plannt" button
document.getElementById('planntButton').addEventListener('click', function() {
    // Retrieve the current flower buds from localStorage
    let flowerBuds = JSON.parse(localStorage.getItem('flowerBuds')) || [];

    // Check if the maximum number of pots has been reached
    if (flowerBuds.length >= MAX_POTS) {
        alert('The planting space is full. You cannot add more flower buds.');
        return;
    }

    // If fewer than 8 buds exist, navigate to the page to add a new bud
    window.location.href = 'bud.html'; // Assuming 'bud.html' allows creation of new buds
});

const audio = document.getElementById('music');
    audio.play();

