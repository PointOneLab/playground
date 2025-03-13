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
                const positionElement = item.querySelector('.pow-itemposition');
                const orderElement = item.querySelector('.pow-item-order');
            
                // Step 1: Check data-raw-content
                console.log(`[dragend] Checking positionElement:`, positionElement);
                console.log(`[dragend] Checking data-raw-content attribute:`, positionElement?.getAttribute('data-raw-content'));
            
                // Step 2: Parse existing data-raw-content or reinitialize if missing
                let rawContent = positionElement?.getAttribute('data-raw-content') || '';
                if (!rawContent) {
                    console.warn(`[dragend] data-raw-content is missing. Reinitializing with default.`);
                    rawContent = `"default": "50,50"`;
                    positionElement.setAttribute('data-raw-content', rawContent);
                }
            
                const existingPosition = this.parsePositionOrderFormat(rawContent);
                console.log(`[dragend] Parsed object from data-raw-content:`, existingPosition);
            
                // Step 3: Get new position values (from drag event)
                const newPosition = `${item.dataset.leftPercent},${item.dataset.topPercent}`;
                console.log(`[dragend] New position for ${pageIdentifier}:`, newPosition);
            
                // Step 4: Merge new data into the parsed object
                existingPosition[pageIdentifier] = newPosition; // Add or update the key-value pair
                console.log(`[dragend] Merged object (after adding new position):`, existingPosition);
            
                // Step 5: Serialize the merged object
                const serializedPosition = this.stringifyPositionOrderFormat(existingPosition);
                console.log(`[dragend] Serialized data-raw-content:`, serializedPosition);
            
                // Step 6: Update the DOM element with the serialized data
                positionElement.setAttribute('data-raw-content', serializedPosition);
                console.log(`[dragend] Updated data-raw-content attribute:`, positionElement.getAttribute('data-raw-content'));
            
                // Step 7: Parse and update order (if applicable)
                let rawOrderContent = orderElement?.getAttribute('data-raw-content') || '';
                if (!rawOrderContent) {
                console.warn(`[dragend] data-raw-content for order is missing. Reinitializing with default.`);
                rawOrderContent = `"default": "1"`;
                orderElement.setAttribute('data-raw-content', rawOrderContent);
                }
                const existingOrder = this.parsePositionOrderFormat(rawOrderContent);
                const newOrder = item.style.zIndex || '1';
                existingOrder[pageIdentifier] = newOrder;
                const serializedOrder = this.stringifyPositionOrderFormat(existingOrder);
                console.log(`[dragend] Serialized data-raw-content for order:`, serializedOrder);
                orderElement.setAttribute('data-raw-content', serializedOrder);
            
                // Store changes in the global map
                window.positionChanges.set(itemId, {
                    itemId,
                    position: serializedPosition,
                    order: serializedOrder,
                    collectionType
                });
            
                // Update change count
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