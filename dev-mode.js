document.addEventListener("DOMContentLoaded", function () {
    // Get the page context: collection and ID from the <body> tag
    const contextCollection = document.body.getAttribute('pow-database-collection');
    const contextId = document.body.getAttribute('pow-database-id');
  
    if (!contextCollection || !contextId) {
      console.error("Page context attributes (pow-database-collection or pow-database-id) are missing or invalid.");
      return;
    }
  
    // Select all elements with the attribute pow-database-field
    const dataElements = document.querySelectorAll('[pow-database-field]');
  
    dataElements.forEach((element) => {
      try {
        // Get the raw content from the RichTextBlock or plain text
        const rawContent = element.innerText.trim();
  
        // Check if the content follows the structured format (contains ":" and ";")
        if (rawContent.includes(':') && rawContent.includes(';')) {
          // Process structured format
          const cleanedContent = rawContent.replace(/^"|"$/g, '').trim(); // Remove leading/trailing quotes
          const entries = cleanedContent.split(';').map(entry => entry.trim()).filter(entry => entry); // Split and clean entries
          const dataMap = {};
  
          entries.forEach(entry => {
            const [key, value] = entry.split(':').map(part => part.trim());
            if (key && value) {
              dataMap[key.replace(/"/g, '')] = value.replace(/"/g, ''); // Remove quotes around keys and values
            }
          });
  
          // Resolve the specific value based on the context
          const resolvedKey = `${contextCollection}/${contextId}`;
          const resolvedValue = dataMap[resolvedKey] || dataMap["default"] || "No data available.";
  
          // Render the resolved content
          element.setAttribute('data-raw-content', rawContent);
          console.log(`[DOMContentLoaded] Stored raw content for element:`, rawContent);
console.log(`[DOMContentLoaded] data-raw-content attribute:`, element.getAttribute('data-raw-content'));
          element.innerText = resolvedValue;
        } else {
          // Use the entire content as the default if no structured format is detected
          element.innerText = rawContent;
        }
      } catch (error) {
        console.error("Error processing content for element with pow-database-field:", error);
        element.innerText = "Error loading data.";
      }
    });
  });

// Dev Mode Manager
const DevModeManager = {
    parsePositionOrderFormat(value) {
        if (!value || !value.includes(':')) {
            return {};
        }
        const result = {};
        const entries = value.split(';').map(entry => entry.trim()).filter(entry => entry);
        entries.forEach(entry => {
            const separatorIndex = entry.indexOf(':');
            if (separatorIndex === -1) return; // Skip invalid entries
            const key = entry.slice(0, separatorIndex).trim().replace(/"/g, '');
            const val = entry.slice(separatorIndex + 1).trim().replace(/"/g, '');
            if (key && val) {
                result[key] = val;
            }
        });
        return result;
    },

    stringifyPositionOrderFormat(obj) {
        console.log(`[stringifyPositionOrderFormat] Input object:`, obj);
        return Object.entries(obj)
            .map(([key, value]) => `"${key}": "${value}"`)
            .join('; ');
    },

    init() {
        const hash = window.location.hash;
        if (!hash.startsWith('#dev_')) return;
        
        const devKey = hash.replace('#dev_', '');
        this.enableDevMode(devKey);
    },

    enableDevMode(key) {
        document.body.classList.add('dev-mode');
        document.documentElement.style.setProperty('--dev-mode-bg', 'rgba(255, 250, 240, 0.95)');
        
        this.addDevControls();
        window.positionChanges = new Map();
        this.initDraggableTracking(key);
    },

    addDevControls() {
        const controls = document.createElement('div');
        controls.className = 'dev-controls';
        controls.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            background: #FEF3C7;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `;
        
        controls.innerHTML = `
            <div style="color: #92400E; margin-bottom: 8px;">Dev Mode Active</div>
            <button id="saveChanges" style="
                background: #D97706;
                color: white;
                padding: 8px 16px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            ">Save Changes</button>
            <div id="changeCount" style="font-size: 12px; margin-top: 4px;"></div>
        `;
        
        document.body.appendChild(controls);
        document.getElementById('saveChanges').addEventListener('click', () => this.saveChanges());
    },

    initDraggableTracking(devKey) {
        document.querySelectorAll('.pow-item').forEach(item => {
            const draggable = item._draggable;
            if (!draggable) return;

            const collectionType = this.getItemCollectionType(item);
            
            draggable.addEventListener('dragend', () => {
                const itemId = item.getAttribute('data-item-id');
                const contextCollection = document.body.getAttribute('pow-database-collection');
                const contextId = document.body.getAttribute('pow-database-id');
                const pageIdentifier = `${contextCollection}/${contextId}`;
                
                // Get current position and order values
                const positionElement = item.querySelector('.pow-item-coordinates');
                const orderElement = item.querySelector('.pow-item-order');
                
                // Parse existing values
                const existingPosition = this.parsePositionOrderFormat(positionElement?.getAttribute('data-raw-content') || '');
                console.log(`[dragend] Parsed existingPosition object:`, existingPosition);

                // Debugging Code for Parsing Test
                const testValue = `"default": "25,75"; "board/6": "~(25,25)"; "board/148": "75,25"; "static/home": "75,75"`;
                const parsedResult = this.parsePositionOrderFormat(testValue);
                console.log(`[Parsing Test] Parsed result:`, parsedResult);

                const existingOrder = this.parsePositionOrderFormat(orderElement?.innerText || '');
                
                // Get new values
                const newPosition = `${item.dataset.leftPercent},${item.dataset.topPercent}`;
                const newOrder = item.style.zIndex || '1';
                
                // Update values for current page
                console.log(`[Before Update] existingPosition:`, existingPosition);

                existingPosition[pageIdentifier] = newPosition;

                console.log(`[After Update] existingPosition:`, existingPosition);

                existingOrder[pageIdentifier] = newOrder;
                
                
                positionElement.setAttribute('data-raw-content', this.stringifyPositionOrderFormat(existingPosition));
                console.log(`[dragend] Updated data-raw-content attribute:`, positionElement.getAttribute('data-raw-content'));

                // Debugging Code for Serialization Test
                const serialized = this.stringifyPositionOrderFormat(existingPosition);
                console.log(`[Serialization Test] Serialized result:`, serialized);

                // Store changes
                window.positionChanges.set(itemId, {
                    itemId,
                    position: this.stringifyPositionOrderFormat(existingPosition),
                    order: this.stringifyPositionOrderFormat(existingOrder),
                    collectionType
                });
                
                this.updateChangeCount();
            });
        });
    },

    getItemCollectionType(item) {
        if (item.closest('#images-collection')) return 'images';
        if (item.closest('#videos-collection')) return 'videos';
        if (item.closest('#widgets-collection')) return 'widgets';
        if (item.closest('#notes-collection')) return 'notes';
        if (item.closest('#posts-collection')) return 'posts';
        return null;
    },

    updateChangeCount() {
        const count = window.positionChanges.size;
        const countEl = document.getElementById('changeCount');
        if (countEl) {
            countEl.textContent = `${count} item${count !== 1 ? 's' : ''} modified`;
        }
    },

    async saveChanges() {
        const changes = Array.from(window.positionChanges.values());
        console.log(`[saveChanges] Changes being sent to API:`, changes);
        if (changes.length === 0) return;

        const saveButton = document.getElementById('saveChanges');
        saveButton.disabled = true;
        saveButton.textContent = 'Saving...';

        try {
            const devKey = window.location.hash.replace('#dev_', '');
            
            const response = await fetch('https://webflow-position-manager.vercel.app/api/update-positions', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${devKey}`
                },
                body: JSON.stringify({ changes })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Response error:', {
                    status: response.status,
                    statusText: response.statusText,
                    headers: Object.fromEntries(response.headers.entries()),
                    body: errorText
                });
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Success response:', data);
            window.positionChanges.clear();
            this.updateChangeCount();
            saveButton.textContent = 'Changes Saved!';
            setTimeout(() => {
                saveButton.textContent = 'Save Changes';
                saveButton.disabled = false;
            }, 2000);
        } catch (error) {
            console.error('Error saving changes:', error);
            if (error instanceof TypeError) {
                console.error('Network or CORS error details:', error);
            }
            saveButton.textContent = 'Error Saving';
            setTimeout(() => {
                saveButton.textContent = 'Save Changes';
                saveButton.disabled = false;
            }, 2000);
        }
    }
};

// Initialize Dev Mode Manager
document.addEventListener('DOMContentLoaded', () => DevModeManager.init());