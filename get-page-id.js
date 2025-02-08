document.addEventListener("DOMContentLoaded", function () {
    const contextCollection = document.body.getAttribute('pow-database-collection');
    const contextId = document.body.getAttribute('pow-database-id');
    const pageIdentifier = `${contextCollection}/${contextId}`;
  
    console.log('Initial DOM Content Load:', { contextCollection, contextId, pageIdentifier });
  
    if (!contextCollection || !contextId) {
      console.error("Page context attributes missing or invalid");
      return;
    }
  
    // Select both database fields and position/order elements
    const allElements = document.querySelectorAll('[pow-database-field], .pow-itemposition, .pow-item-order');
  
    allElements.forEach((element) => {
      try {
        const rawContent = element.innerText.trim();
        console.log('Processing element:', {
          element,
          class: element.className,
          rawContent
        });
  
        // Store original format for position/order elements
        if (element.classList.contains('pow-itemposition') || element.classList.contains('pow-item-order')) {
          element.dataset.originalFormat = rawContent;
          console.log('Stored original format:', {
            element: element.className,
            originalFormat: rawContent
          });
        }
  
        // Process JSON-like format
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
  
          console.log('Parsed data map:', dataMap);
  
          const resolvedKey = `${contextCollection}/${contextId}`;
          const resolvedValue = dataMap[resolvedKey] || dataMap["default"] || "No data available.";
  
          // Only update innerText, keeping original format in dataset
          element.innerText = resolvedValue;
        }
      } catch (error) {
        console.error("Error processing element:", error);
      }
    });
  });