document.addEventListener("DOMContentLoaded", function () {
    const contextCollection = document.body.getAttribute('pow-database-collection');
    const contextId = document.body.getAttribute('pow-database-id');
    const pageIdentifier = `${contextCollection}/${contextId}`;

    console.log('Initial DOM Content Load:', { contextCollection, contextId, pageIdentifier });

    if (!contextCollection || !contextId) {
        console.error("Page context attributes (pow-database-collection or pow-database-id) are missing or invalid.");
        return;
    }

    // Select all elements with the attribute pow-database-field
    const allElements = document.querySelectorAll('[pow-database-field], .pow-itemposition, .pow-item-order');

    allElements.forEach((element) => {
        try {
            const rawContent = element.innerText.trim();
            console.log('Processing element:', {
                element: element.className,
                rawContent
            });

            // For position/order elements, store the raw format FIRST
            if (element.classList.contains('pow-itemposition') || element.classList.contains('pow-item-order')) {
                console.log('Storing original format for:', element.className);
                element.dataset.originalFormat = rawContent;
            }

            // Then process the content
            if (rawContent.includes(':') && rawContent.includes(';')) {
                const entries = rawContent.split(';').map(entry => entry.trim()).filter(entry => entry);
                const dataMap = {};

                entries.forEach(entry => {
                    const [key, value] = entry.split(':').map(part => part.trim().replace(/"|\'|`/g, ''));
                    if (key && value) {
                        dataMap[key] = value;
                    }
                });

                const resolvedKey = `${contextCollection}/${contextId}`;
                const resolvedValue = dataMap[resolvedKey] || dataMap["default"] || "No data available.";

                // Update display with resolved value
                element.innerText = resolvedValue;

                console.log('Processed element:', {
                    element: element.className,
                    originalFormat: element.dataset.originalFormat,
                    resolvedValue: resolvedValue,
                    dataMap: dataMap
                });
            }
        } catch (error) {
            console.error("Error processing element:", error);
            element.innerText = "Error loading data.";
        }
    });
});