// Dev Mode Manager
const DevModeManager = {
    init() {
      // Check for dev mode from URL hash
      const hash = window.location.hash;
      if (!hash.startsWith('#dev_')) return;
      
      const devKey = hash.replace('#dev_', '');
      this.enableDevMode(devKey);
    },
  
    enableDevMode(key) {
      // Add visual indicators
      document.body.classList.add('dev-mode');
      document.documentElement.style.setProperty('--dev-mode-bg', 'rgba(255, 250, 240, 0.95)');
      
      // Add dev mode controls
      this.addDevControls();
      
      // Store changes
      window.positionChanges = new Map();
      
      // Initialize draggable with position tracking
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
      
      // Add save button handler
      document.getElementById('saveChanges').addEventListener('click', () => this.saveChanges());
    },
  
    initDraggableTracking(devKey) {
        document.querySelectorAll('.pow-item').forEach(item => {
          const draggable = item._draggable;
          if (!draggable) return;
  
          const positionElement = item.querySelector('.pow-itemposition');
          const collectionType = this.getItemCollectionType(item);
          
          // Real-time position update during drag
          draggable.addEventListener('drag', function() {
            const boardRect = document.querySelector('.pow-board').getBoundingClientRect();
            const itemRect = item.getBoundingClientRect();
            
            const leftPercent = ((itemRect.left - boardRect.left + itemRect.width / 2) / boardRect.width * 100);
            const topPercent = ((itemRect.top - boardRect.top + itemRect.height / 2) / boardRect.height * 100);
            
            // Store rounded values
            item.dataset.leftPercent = leftPercent.toFixed(4);
            item.dataset.topPercent = topPercent.toFixed(4);
            
            // Update position display in real-time
            if (positionElement) {
                positionElement.textContent = `${leftPercent.toFixed(4)},${topPercent.toFixed(4)}`;
            }
          });
  
          draggable.addEventListener('dragend', () => {
            const itemId = item.getAttribute('data-item-id');
            const position = `${item.dataset.leftPercent},${item.dataset.topPercent}`;
            
            // Store change
            window.positionChanges.set(itemId, {
              itemId,
              position,
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
      if (changes.length === 0) return;
  
      const saveButton = document.getElementById('saveChanges');
      saveButton.disabled = true;
      saveButton.textContent = 'Saving...';
  
      try {
          // Fix the authorization token handling
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
  
          console.log('Response status:', response.status);
          console.log('Response headers:', Object.fromEntries(response.headers));
  
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