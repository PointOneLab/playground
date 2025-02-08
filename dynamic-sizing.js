document.addEventListener("DOMContentLoaded", function() {
    // Select all the CMS items on the page
    const cmsItems = document.querySelectorAll('.w-dyn-item');

    cmsItems.forEach(item => {
        // Check if both .pow-visualheight and .pow-visual elements exist in the item
        const heightElement = item.querySelector('.pow-visualheight');
        const image = item.querySelector('.pow-visual');

        if (heightElement && image) {
            // Get the height value from the .pow-visualheight element
            const heightValue = heightElement.textContent.trim();
            
            // Set the height of the image and adjust width based on its aspect ratio
            if (heightValue) {
                const height = parseFloat(heightValue, 10);
                image.style.height = height + 'vh';
                image.style.width = 'auto'; // Adjust width automatically
            }
        }
    });
});