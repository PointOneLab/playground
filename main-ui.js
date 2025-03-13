document.addEventListener("DOMContentLoaded", function() {
    const board = document.querySelector(".pow-board");
    const addButton = document.querySelector(".pow-additem");
    const cursorPositionElement = document.querySelector('.pow-cursorposition');
    const messButton = document.querySelector('.pow-mess');
    const stackButton = document.querySelector('.pow-stack');
    const darkOnButton = document.querySelector('.pow-dark-on');
    const darkOffButton = document.querySelector('.pow-dark-off');
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = "drawingSVG";
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute('viewBox', '0 0 100 100');  // Example: set the viewBox to 100x100 units
    svg.style.position = "absolute";
    svg.style.top = 0;
    svg.style.left = 0;
    board.appendChild(svg);
  
    let boardDraggable;
    let isMoveMode = true;  // Start in moving mode by default
  
    let isDrawing = false;
    let currentPath = null;
  
    // Predefined location mapping
    const predefinedLocations = {
      "section1": "25.00,25.00",
      "section2": "25.00,75.00",
      "section3": "75.00,25.00",
      "section4": "75.00,75.00",
      "center": "50.00,50.00"
    };
  
    // Get coordinates relative to the board for mouse events
    function getBoardCoordinates(event) {
      const boardRect = board.getBoundingClientRect();
      const x = ((event.clientX - boardRect.left) / boardRect.width) * 100;
      const y = ((event.clientY - boardRect.top) / boardRect.height) * 100;
      return { x, y };
    }
  
    // Mouse events
    document.addEventListener('mousemove', (e) => {
      const { x, y } = getBoardCoordinates(e);
      if (cursorPositionElement) {
        cursorPositionElement.innerText = `${x.toFixed(2)},${y.toFixed(2)}`;
      }
    });
  
    // Touch events to show cursor position
    document.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];  // Get the first touch point
      const { x, y } = getBoardCoordinates(touch);
      if (cursorPositionElement) {
        cursorPositionElement.innerText = `${x.toFixed(2)},${y.toFixed(2)}`;
      }
    });
  
  // Get coordinates relative to the SVG's viewBox for mouse events
  function getViewBoxCoordinates(event) {
      const svgRect = svg.getBoundingClientRect();
      const scaleX = 100 / svgRect.width;  // Assume viewBox width is 100 units
      const scaleY = 100 / svgRect.height;  // Assume viewBox height is 100 units
      const x = (event.clientX - svgRect.left) * scaleX;
      const y = (event.clientY - svgRect.top) * scaleY;
      return { x, y };
  }
  
  // Get coordinates relative to the SVG's viewBox for touch events
  function getTouchCoordinates(event) {
      const touch = event.touches[0];  // Get the first touch point
      const svgRect = svg.getBoundingClientRect();
      const scaleX = 100 / svgRect.width;  // Assume viewBox width is 100 units
      const scaleY = 100 / svgRect.height;  // Assume viewBox height is 100 units
      const x = (touch.clientX - svgRect.left) * scaleX;
      const y = (touch.clientY - svgRect.top) * scaleY;
      return { x, y };
  }
  
  // Mouse events
  svg.addEventListener('mousedown', (e) => {
      if (isMoveMode) return;
  
      boardDraggable.disable();  // Disable board dragging while drawing
  
      isDrawing = true;
      const { x, y } = getViewBoxCoordinates(e);
  
      // Create a new SVG path
      currentPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      currentPath.setAttribute('d', `M ${x} ${y}`);
      currentPath.setAttribute('stroke', getCurrentPenColor());
      currentPath.setAttribute('stroke-width', '0.05');
      currentPath.setAttribute('fill', 'none');
      currentPath.setAttribute('stroke-linecap', 'round');
      currentPath.setAttribute('stroke-linejoin', 'round');
      svg.appendChild(currentPath);
  });
  
  svg.addEventListener('mousemove', (e) => {
      if (!isDrawing || isMoveMode) return;
  
      const { x, y } = getViewBoxCoordinates(e);
      const d = currentPath.getAttribute('d');
      currentPath.setAttribute('d', `${d} L ${x} ${y}`);
  });
  
  svg.addEventListener('mouseup', () => {
      if (!isDrawing) return;
  
      boardDraggable.enable();  // Re-enable board dragging after drawing
      isDrawing = false;
      currentPath = null;  // Reset after drawing is finished
  });
  
  // Touch events
  svg.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (isMoveMode) return;
  
      boardDraggable.disable();  // Disable board dragging while drawing
  
      const { x, y } = getTouchCoordinates(e);
  
      // Create a new SVG path
      currentPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      currentPath.setAttribute('d', `M ${x} ${y}`);
      currentPath.setAttribute('stroke', getCurrentPenColor());
      currentPath.setAttribute('stroke-width', '0.05');
      currentPath.setAttribute('fill', 'none');
      currentPath.setAttribute('stroke-linecap', 'round');
      currentPath.setAttribute('stroke-linejoin', 'round');
      svg.appendChild(currentPath);
  });
  
  svg.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!currentPath || isMoveMode) return;
  
      const { x, y } = getTouchCoordinates(e);
      const d = currentPath.getAttribute('d');
      currentPath.setAttribute('d', `${d} L ${x} ${y}`);
  });
  
  svg.addEventListener('touchend', () => {
      if (!currentPath) return;
      currentPath = null;
      boardDraggable.enable();  // Re-enable board dragging after touch ends
  });
  
    gsap.registerPlugin(Draggable);
  
    // Create draggable board
    boardDraggable = Draggable.create(board, {
      type: "top,left", // Changed to "top,left"
      edgeResistance: 0.65,
      bounds: document.querySelector(".pow-boardcontainer"),
      allowEventDefault: true,
      dragClickables: false,
      inertia: true,
          onPress: function (e) {
        // **Prevent board dragging if gesture starts on a pow-item**
        if (e.target.closest(".pow-item")) {
          this.endDrag(); // **Immediately stop dragging**
        }
      },
    })[0];
  
    // Disable scrolling
    document.body.style.overflow = 'hidden';
  
    // Function to get current pen color from CSS variable
    function getCurrentPenColor() {
      const root = document.documentElement;
      return getComputedStyle(root).getPropertyValue('--pen').trim();
    }
  
    // Toggle between draw and drag modes
    document.querySelector(".pow-draw").addEventListener("click", () => {
      isMoveMode = false;
      board.style.cursor = "crosshair";
          svg.style.cursor = "crosshair";
  
    });
    document.querySelector(".pow-drag").addEventListener("click", () => {
      isMoveMode = true;
      board.style.cursor = "grab";
          svg.style.cursor = "grab";
  
  
    });
  
    // Function to calculate and store the left and top position of each item as a percentage of the board
    function storeItemPositionAsPercentage(item) {
      const boardRect = board.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
  
      const leftPercent = (((itemRect.left - boardRect.left) + itemRect.width / 2) / boardRect.width) * 100;
      const topPercent = (((itemRect.top - boardRect.top) + itemRect.height / 2) / boardRect.height) * 100;
  
      item.dataset.leftPercent = leftPercent;
      item.dataset.topPercent = topPercent;
      
          // Update coordinates display only for existing items (with pow-item-coordinates)
      const coordsDisplay = item.querySelector('.pow-item-coordinates');
      if (coordsDisplay) {
          coordsDisplay.textContent = `${leftPercent.toFixed(2)},${topPercent.toFixed(2)}`;
      }
      
      console.log(`Stored position for item: left ${leftPercent}%, top ${topPercent}%`);
    }
  
    
    
    function storeItemOrder(item, order) {
      item.dataset.order = order;
      item.style.zIndex = order;
      
      // Update order display if it exists
      const orderDisplay = item.querySelector('.pow-item-order');
      if (orderDisplay) {
          orderDisplay.textContent = order;
      }
    }
    
    
    // Function to reposition items based on percentage values during browser resizing
    function repositionItemsOnResize() {
      const boardRect = board.getBoundingClientRect();
  
      document.querySelectorAll('.pow-item').forEach(item => {
        const leftPercent = parseFloat(item.dataset.leftPercent);
        const topPercent = parseFloat(item.dataset.topPercent);
  
        const newLeftPx = (leftPercent / 100) * boardRect.width - (item.offsetWidth / 2);
        const newTopPx = (topPercent / 100) * boardRect.height - (item.offsetHeight / 2);
  
        item.style.left = `${newLeftPx}px`;
        item.style.top = `${newTopPx}px`;
        console.log(`Calculated new center position: left ${newLeftPx}px, top ${newTopPx}px`);
  
        const draggableInstance = Draggable.get(item);
        if (draggableInstance) {
          draggableInstance.update(true); // Update Draggable's internal state
        }
  
        console.log(`New pixel position: left ${newLeftPx}px, top ${newTopPx}px`);
      });
    }
  
    // Handle resizing the viewport
    window.addEventListener("resize", function() {
      console.log("Resizing browser window...");
      repositionItemsOnResize();
    });
  
    // Position items based on their defined coordinates or predefined names
  function positionExistingItems() {
      document.querySelectorAll('.pow-item').forEach(item => {
          const positionText = item.querySelector('.pow-itemposition')?.innerText.trim();
          if (!positionText) return;
  
          let [x, y] = [0, 0];
          if (predefinedLocations[positionText]) {
              [x, y] = predefinedLocations[positionText].split(',').map(Number);
          } else if (positionText.startsWith('~(') && positionText.endsWith(')')) {
              const value = positionText.slice(2, -1).trim();
              if (predefinedLocations[value]) {
                  [x, y] = predefinedLocations[value].split(',').map(Number);
              } else {
                  [x, y] = value.split(',').map(Number);
              }
              x += (Math.random() - 0.5) * 10;
              y += (Math.random() - 0.5) * 10;
          } else if (positionText === 'random') {
              x = 10 + Math.random() * 80;
      y = 10 + Math.random() * 80;
          } else {
              [x, y] = positionText.split(',').map(Number);
          }
  
          // Store positions immediately
          item.dataset.leftPercent = x;
          item.dataset.topPercent = y;
  
          // Do initial positioning immediately for visibility
          const boardRect = board.getBoundingClientRect();
          const initialLeftPx = (x / 100) * boardRect.width - (item.offsetWidth / 2);
          const initialTopPx = (y / 100) * boardRect.height - (item.offsetHeight / 2);
          item.style.left = `${initialLeftPx}px`;
          item.style.top = `${initialTopPx}px`;
          
          // Then handle precise positioning with media loading
          const imageElement = item.querySelector('.pow-visual');
          const videoElement = item.querySelector('.pow-video-embed');
  
          if (imageElement) {
              const adjustImagePosition = () => {
                  requestAnimationFrame(() => {
                      const updatedBoardRect = board.getBoundingClientRect();
                      const finalLeftPx = (x / 100) * updatedBoardRect.width - (imageElement.offsetWidth / 2);
                      const finalTopPx = (y / 100) * updatedBoardRect.height - (imageElement.offsetHeight / 2);
                      item.style.left = `${finalLeftPx}px`;
                      item.style.top = `${finalTopPx}px`;
                  });
              };
  
              if (imageElement.complete) {
                  adjustImagePosition();
              } else {
                  imageElement.addEventListener('load', adjustImagePosition);
              }
          } else if (videoElement) {
              const adjustVideoPosition = () => {
                  requestAnimationFrame(() => {
                      const updatedBoardRect = board.getBoundingClientRect();
                      const finalLeftPx = (x / 100) * updatedBoardRect.width - (videoElement.offsetWidth / 2);
                      const finalTopPx = (y / 100) * updatedBoardRect.height - (videoElement.offsetHeight / 2);
                      item.style.left = `${finalLeftPx}px`;
                      item.style.top = `${finalTopPx}px`;
                  });
              };
  
              if (videoElement.readyState >= 1) {
                  adjustVideoPosition();
              } else {
                  videoElement.addEventListener('loadedmetadata', adjustVideoPosition);
              }
          }
      });
  }
  
  function positionItemWithLoadedDimensions(item, x, y, mediaElement = null) {
      const boardRect = board.getBoundingClientRect();
      let elementForDimensions;
      
      if (mediaElement) {
          // For media elements (images or videos), use their direct dimensions
          elementForDimensions = mediaElement;
      } else {
          // For other items, use the item's dimensions
          elementForDimensions = item;
      }
  
      // Get precise measurements
      const rect = elementForDimensions.getBoundingClientRect();
      
      // Calculate center position with precise decimal values
      const newLeftPx = Math.round(((x / 100) * boardRect.width) - (rect.width / 2));
      const newTopPx = Math.round(((y / 100) * boardRect.height) - (rect.height / 2));
  
      // Apply position
      item.style.left = `${newLeftPx}px`;
      item.style.top = `${newTopPx}px`;
  
      // Update coordinate display
      const coordsDisplay = item.querySelector('.pow-item-coordinates');
      if (coordsDisplay) {
          coordsDisplay.textContent = `${x.toFixed(2)},${y.toFixed(2)}`;
      }
  
      // Debug logging
      console.log('Positioning details:', {
          type: mediaElement ? (mediaElement.tagName === 'VIDEO' ? 'video' : 'image') : 'other',
          dimensions: {
              width: rect.width,
              height: rect.height
          },
          position: {
              x,
              y,
              leftPx: newLeftPx,
              topPx: newTopPx
          }
      });
  }
    
    // Store the percentage positions for all existing items on load
    document.querySelectorAll('.pow-item').forEach(item => {
      storeItemPositionAsPercentage(item);
    });
  
    // Position all existing items initially
    positionExistingItems();
  
  // Add event listeners for existing items
  document.querySelectorAll('.pow-item').forEach(item => {
    const handler = item.querySelector('.pow-item-handler'); // Select the handler
  
    // Get order from CMS
    const orderElement = item.querySelector('.pow-item-order');
    if (orderElement) {
      const rawContent = orderElement.innerText.trim();
      
      // Check if content follows the JSON-like format
      if (rawContent.includes(':') && rawContent.includes(';')) {
        // Get the page context
        const contextCollection = document.body.getAttribute('pow-database-collection');
        const contextId = document.body.getAttribute('pow-database-id');
        
        // Process JSON-like format
        const cleanedContent = rawContent.replace(/^"|"$/g, '').trim();
        const entries = cleanedContent.split(';').map(entry => entry.trim()).filter(entry => entry);
        const dataMap = {};
        
        entries.forEach(entry => {
            const [key, value] = entry.split(':').map(part => part.trim());
            if (key && value) {
                dataMap[key.replace(/"/g, '')] = parseInt(value.replace(/"/g, ''));
            }
        });
        
        // Resolve the specific value based on the context
        const resolvedKey = `${contextCollection}/${contextId}`;
        const orderValue = dataMap[resolvedKey] || dataMap["default"] || 1;
        
        storeItemOrder(item, orderValue);
      } else {
        // Handle simple numeric value
        const orderValue = parseInt(rawContent);
        if (!isNaN(orderValue)) {
          storeItemOrder(item, orderValue);
        } else {
          storeItemOrder(item, 1);
        }
      }
    } else {
      storeItemOrder(item, 1);
    }
    
    const hideButton = item.querySelector(".pow-item-hide");
    if (hideButton) {
      hideButton.addEventListener('click', (e) => {
        e.stopPropagation();
        hideItem(item);
      });
    }
  
  // Make existing items draggable and store the Draggable instance
  let itemDraggable = Draggable.create(item, {
    type: "top,left",
    bounds: board,
  inertia: true,
    trigger: handler,
  ignore: ".pow-item input",
  allowEventDefault: true,
    dragClickables: true,
    onDragStart: function() {
      boardDraggable.disable();
      // When dragged, move to top of current items
      const highestZIndex = Math.max(
        ...Array.from(document.querySelectorAll('.pow-item'))
          .map(i => parseInt(i.style.zIndex) || 0)
      );
      storeItemOrder(item, highestZIndex + 1);
    },
    onDrag: function() {
          storeItemPositionAsPercentage(this.target);
      },
    onDragEnd: function() {
      boardDraggable.enable();
      storeItemPositionAsPercentage(item);
    }
  })[0]; // Get the Draggable instance from the array
  item._draggable = itemDraggable; // Store the Draggable instance in the item
  
      
  
    });
  
    // Add new item functionality
    addButton.addEventListener("click", function() {
      
      const now = new Date();
      const formattedTime =
          "@" + ("0" + now.getHours()).slice(-2) + ":" +
          ("0" + now.getMinutes()).slice(-2) + ":" +
          ("0" + now.getSeconds()).slice(-2) + " ";
  
  
      const newItem = document.createElement("div");
      newItem.classList.add("pow-item");
      newItem.style.width = "25vh";
      newItem.style.height = "25vh";
      newItem.style.display = "flex";
      newItem.style.flexDirection = "column-reverse";
      newItem.style.alignItems = "left";
      newItem.style.justifyContent = "top";
      newItem.style.position = "absolute";
      
      const itemContent = document.createElement("div");
      itemContent.classList.add("pow-item-content");
  
      // Create editable content inside the sticky note
      const stickyContent = document.createElement("div");
      stickyContent.classList.add("pow-sticky");
      stickyContent.setAttribute("contenteditable", "true");
          stickyContent.style.width = "25vh";
      stickyContent.style.height = "25vh";
      
      // Set the initial content to the formatted time
      stickyContent.innerText = formattedTime;
      
      itemContent.appendChild(stickyContent);
          
      newItem.appendChild(itemContent);
      
       const handlerDiv = document.createElement("div");
      handlerDiv.classList.add("pow-item-handler");
  
          newItem.appendChild(handlerDiv);
  
  
      const hideButton = document.createElement("div");
      hideButton.classList.add("pow-item-hide");
      
      // Append the hide button to the new item
      handlerDiv.appendChild(hideButton);
  
      board.appendChild(newItem); // Append the new item to the board
  
      // Store the position for the new item
      storeItemPositionAsPercentage(newItem);
  
      // Reinitialize Webflow interactions after the new item is added
      //window.Webflow && window.Webflow.require('ix2').init();
      
      applyCurrentMode(); // Ensure dark or light mode persists after adding the note
  
      
      // Force a reflow after the new item is appended to the DOM
      newItem.offsetHeight; // This forces the reflow
  
      // **Force focus on the sticky content initially**
      stickyContent.focus();
  
      // **Re-enable editing when the sticky content is clicked again after losing focus**
      stickyContent.addEventListener("click", function() {
        stickyContent.focus();  // Force focus back on contenteditable div
      });
  
      // Hide the item only when the hide button is clicked
      hideButton.addEventListener('click', (e) => {
        e.stopPropagation();
        hideItem(newItem);
      });
  
      // Make the new item draggable
      Draggable.create(newItem, {
        type: "top,left", // Changed to "top,left"
        bounds: board,
        inertia: true,
        trigger: handlerDiv,
        ignore: ".pow-item input",
        allowEventDefault: true,
        dragPropagation: true,      
         onDragStart: function() {
          boardDraggable.disable();
        },
        onDragEnd: function() {
          boardDraggable.enable();
          storeItemPositionAsPercentage(newItem);
        }
      });
      // Set new items to highest z-index
      storeItemOrder(newItem, 9999);
      
    });
  
  
    function hideItem(item) {
        // Pause any video inside the item
      const video = item.querySelector('video');
      if (video) {
          video.pause(); // Pause the video
      }  
    
      item.style.display = "none";
      showHideButton(item, false);
    }
  
  
  
    // Mess button functionality: reposition all items to a random location
    messButton.addEventListener("click", () => {
      document.querySelectorAll('.pow-item').forEach(item => {
          const x = 10 + Math.random() * 80;
          const y = 10 + Math.random() * 80;
    
        item.dataset.leftPercent = x;
        item.dataset.topPercent = y;
    
        const boardRect = board.getBoundingClientRect();
        const newLeftPx = (x / 100) * boardRect.width - (item.offsetWidth / 2);
        const newTopPx = (y / 100) * boardRect.height - (item.offsetHeight / 2);
    
        item.style.left = `${newLeftPx}px`;
        item.style.top = `${newTopPx}px`;
        
                // Update coordinates display
          const coordsDisplay = item.querySelector('.pow-item-coordinates');
          if (coordsDisplay) {
              coordsDisplay.textContent = `${x.toFixed(2)},${y.toFixed(2)}`;
          }
    
        console.log(`Repositioned item to random location: left ${x}%, top ${y}%`);
      });
    });
  
    // Stack button functionality: position all items to the center of the board
    stackButton.addEventListener("click", () => {
      document.querySelectorAll('.pow-item').forEach(item => {
        const x = 50;
        const y = 50;
    
        item.dataset.leftPercent = x;
        item.dataset.topPercent = y;
    
        const boardRect = board.getBoundingClientRect();
        const newLeftPx = (x / 100) * boardRect.width - (item.offsetWidth / 2);
        const newTopPx = (y / 100) * boardRect.height - (item.offsetHeight / 2);
    
        item.style.left = `${newLeftPx}px`;
        item.style.top = `${newTopPx}px`;
        
                // Update coordinates display
          const coordsDisplay = item.querySelector('.pow-item-coordinates');
          if (coordsDisplay) {
              coordsDisplay.textContent = `${x.toFixed(2)},${y.toFixed(2)}`;
          }
    
        console.log(`Positioned item to center: left ${x}%, top ${y}%`);
      });
    });
  });