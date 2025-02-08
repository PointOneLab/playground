document.addEventListener("DOMContentLoaded", function() {
    // Initialize both height adjustments and position handling
    const cmsItems = document.querySelectorAll('.w-dyn-item');
    const contextCollection = document.body.getAttribute('pow-database-collection');
    const contextId = document.body.getAttribute('pow-database-id');
    const pageIdentifier = `${contextCollection}/${contextId}`;

    cmsItems.forEach(item => {
        // Handle height adjustments
        const heightElement = item.querySelector('.pow-visualheight');
        const image = item.querySelector('.pow-visual');

        if (heightElement && image) {
            const heightValue = heightElement.textContent.trim();
            if (heightValue) {
                const height = parseFloat(heightValue, 10);
                image.style.height = height + 'vh';
                image.style.width = 'auto';
            }
        }

        // Handle position initialization
        const positionElement = item.querySelector('.pow-itemposition');
        if (!positionElement) return;

        const rawContent = positionElement.innerText.trim();
        let position = "50,50"; // System default

        if (rawContent) {
            try {
                const entries = rawContent.split(';').map(entry => entry.trim());
                const positionMap = {};
                
                entries.forEach(entry => {
                    if (!entry) return;
                    const [key, value] = entry.split(':').map(part => part.trim().replace(/"/g, ''));
                    if (key && value) {
                        positionMap[key] = value;
                    }
                });

                position = positionMap[pageIdentifier] || positionMap["default"] || position;
            } catch (error) {
                console.error('Error parsing position:', error);
            }
        }

        const [x, y] = position.split(',').map(Number);
        item.dataset.leftPercent = x.toFixed(4);
        item.dataset.topPercent = y.toFixed(4);
        positionElement.textContent = `${x.toFixed(4)},${y.toFixed(4)}`;

        const boardRect = document.querySelector('.pow-board').getBoundingClientRect();
        const initialLeftPx = (x / 100) * boardRect.width - (item.offsetWidth / 2);
        const initialTopPx = (y / 100) * boardRect.height - (item.offsetHeight / 2);
        item.style.left = `${initialLeftPx}px`;
        item.style.top = `${initialTopPx}px`;
    });
});