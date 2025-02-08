document.addEventListener("DOMContentLoaded", function () {
    const contextCollection = document.body.getAttribute('pow-database-collection');
    const contextId = document.body.getAttribute('pow-database-id');
  
    if (!contextCollection || !contextId) {
        console.error("Page context attributes (pow-database-collection or pow-database-id) are missing or invalid.");
        return;
    }
  
    const dataElements = document.querySelectorAll('[pow-database-field]');
  
    dataElements.forEach((element) => {
        try {
            const rawContent = element.innerText.trim();
  
            if (rawContent.includes(':') && rawContent.includes(';')) {
                const cleanedContent = rawContent.replace(/^"|"$/g, '').trim();
                const entries = cleanedContent.split(';').map(entry => entry.trim()).filter(entry => entry);
                const dataMap = {};
  
                entries.forEach(entry => {
                    const [key, value] = entry.split(':').map(part => part.trim());
                    if (key && value) {
                        dataMap[key.replace(/"/g, '')] = value.replace(/"/g, '');
                    }
                });
  
                const resolvedKey = `${contextCollection}/${contextId}`;
                const resolvedValue = dataMap[resolvedKey] || dataMap["default"] || "No data available.";
  
                // Store the original data as a data attribute
                element.setAttribute('data-original-format', rawContent);
                
                // Create a display element for the resolved value
                const displayElement = document.createElement('div');
                displayElement.className = 'resolved-value';
                displayElement.innerText = resolvedValue;
                
                // Replace the original content with the display element
                element.innerText = ''; // Clear the original content
                element.appendChild(displayElement);
                
                // Add a hidden input to store the full data map
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.className = 'full-data-map';
                hiddenInput.value = JSON.stringify(dataMap);
                element.appendChild(hiddenInput);
            } else {
                // For non-structured content, still preserve it as original format
                element.setAttribute('data-original-format', rawContent);
                const displayElement = document.createElement('div');
                displayElement.className = 'resolved-value';
                displayElement.innerText = rawContent;
                element.innerText = '';
                element.appendChild(displayElement);
            }
        } catch (error) {
            console.error("Error processing content for element with pow-database-field:", error);
            element.innerText = "Error loading data.";
        }
    });
});