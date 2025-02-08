// Dev Mode Manager
const DevModeManager = {
    parsePositionOrderFormat(value) {
        if (!value || !value.includes(':') || !value.includes(';')) {
            return {};
        }
        
        const entries = value.split(';').map(entry => entry.trim()).filter(entry => entry);
        const result = {};
        
        entries.forEach(entry => {
            const [key, value] = entry.split(':').map(part => part.trim());
            if (key && value) {
                const cleanKey = key.replace(/^["']|["']$/g, '');
                const cleanValue = value.replace(/^["']|["']$/g, '');
                result[cleanKey] = cleanValue;
            }
        });
        
        return result;
    },

    stringifyPositionOrderFormat(data) {
        return Object.entries(data)
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
                
                // Get current position and order values first
                const positionElement = item.querySelector('.pow-itemposition');
                const orderElement = item.querySelector('.pow-item-order');
    
                // Now we can log position data
                console.log('Dragend start - Position data:', {
                    element: positionElement,
                    originalFormat: positionElement?.dataset.originalFormat,
                    currentText: positionElement?.innerText
                });
                
                console.log('Dragend triggered - Elements found:', {
                    positionElement: {
                        exists: !!positionElement,
                        originalFormat: positionElement?.dataset.originalFormat,
                        currentText: positionElement?.innerText
                    },
                    orderElement: {
                        exists: !!orderElement,
                        originalFormat: orderElement?.dataset.originalFormat,
                        currentText: orderElement?.innerText
                    }
                });
            
                // Parse from original format stored in dataset
                const originalPositionFormat = positionElement?.dataset.originalFormat || '';
                const originalOrderFormat = orderElement?.dataset.originalFormat || '';
            
                console.log('Original formats:', {
                    position: originalPositionFormat,
                    order: originalOrderFormat
                });
            
                // Parse existing values from original format
                const existingPosition = this.parsePositionOrderFormat(originalPositionFormat);
                const existingOrder = this.parsePositionOrderFormat(originalOrderFormat);
                
                // Get new values
                const newPosition = `${item.dataset.leftPercent},${item.dataset.topPercent}`;
                const newOrder = item.style.zIndex || '1';
                
                console.log('Update values:', {
                    existingPosition,
                    newPosition,
                    existingOrder,
                    newOrder,
                    pageIdentifier
                });
            
                // Only update current page values
                const updatedPosition = { ...existingPosition };
                const updatedOrder = { ...existingOrder };
                
                updatedPosition[pageIdentifier] = newPosition;
                updatedOrder[pageIdentifier] = newOrder;
                
                console.log('Final values:', {
                    updatedPosition,
                    updatedOrder
                });
                
                // Store changes
                window.positionChanges.set(itemId, {
                    itemId,
                    position: this.stringifyPositionOrderFormat(updatedPosition),
                    order: this.stringifyPositionOrderFormat(updatedOrder),
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