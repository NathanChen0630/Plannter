// Add event listeners to each flower bud image
document.querySelectorAll('.flower-bud').forEach(bud => {
    bud.addEventListener('click', function() {
        const budId = bud.dataset.id; // Get flower (ID)
        const budName = bud.dataset.name; // Get flower name
        const budSrc = bud.src; // Get flower image source
        const flowerType = bud.dataset.type; // Get flower type (Rose, Tulip, etc.)

        // Redirect to create_task.html with budId, budName, budSrc, and flowerType
        window.location.href = `create_task.html?budId=${budId}&budName=${encodeURIComponent(budName)}&budSrc=${encodeURIComponent(budSrc)}&flowerType=${encodeURIComponent(flowerType)}`;
    });
});


