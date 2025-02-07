(function() {

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
  
  document.addEventListener("DOMContentLoaded", function () {
    // Map checkboxes to their respective collection IDs
    const controls = [
      { checkboxId: "images-checkbox", collectionId: "images-collection" },
      { checkboxId: "videos-checkbox", collectionId: "videos-collection" },
      { checkboxId: "posts-checkbox", collectionId: "posts-collection" },
      { checkboxId: "widgets-checkbox", collectionId: "widgets-collection" },
      { checkboxId: "notes-checkbox", collectionId: "notes-collection" },
    ];
  
    controls.forEach(({ checkboxId, collectionId }) => {
      const checkbox = document.getElementById(checkboxId);
      const collection = document.getElementById(collectionId);
  
      // Initialize visibility based on checkbox state
      if (!checkbox.checked) {
        collection.classList.add("pow-none");
      }
  
      // Add event listener to toggle visibility
      checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
          collection.classList.remove("pow-none");
        } else {
          collection.classList.add("pow-none");
        }
      });
    });
  });
  
    document.addEventListener("DOMContentLoaded", function () {
      // Select all pow-item elements
      const powItems = document.querySelectorAll(".pow-item");
  
      powItems.forEach((item) => {
        const hoverShow = item.querySelector(".pow-itemhovershow"); // Hover div
  
        if (hoverShow) {
          // Function to calculate and set the width of pow-itemhovershow
          const updateWidth = () => {
            let maxWidth = 0;
  
            // Iterate over all children of pow-item except pow-itemhovershow
            Array.from(item.children).forEach((child) => {
              if (!child.classList.contains("pow-itemhovershow")) {
                const childWidth = child.offsetWidth; // Get child element's width
                if (childWidth > maxWidth) maxWidth = childWidth; // Update maxWidth
              }
            });
  
            // Apply the maximum width to pow-itemhovershow
            hoverShow.style.width = `${maxWidth}px`;
          };
  
          // Initial width calculation
          updateWidth();
  
          // Observe size changes in the children of pow-item
          const resizeObserver = new ResizeObserver(() => updateWidth());
          Array.from(item.children).forEach((child) => {
            if (!child.classList.contains("pow-itemhovershow")) {
              resizeObserver.observe(child); // Watch for size changes in children
            }
          });
        }
      });
    });
  
      document.addEventListener("DOMContentLoaded", function () {
          // Find all <audio> elements on the page
          document.querySelectorAll("audio").forEach(audio => {
              // Create a wrapper div with class 'audio-player'
              const wrapper = document.createElement("div");
              wrapper.className = "audio-player";
              
              // Insert the wrapper before the audio element in the DOM
              audio.parentNode.insertBefore(wrapper, audio);
              
              // Move the audio element inside the wrapper
              wrapper.appendChild(audio);
          });
      });
  
  document.addEventListener("DOMContentLoaded", () => {
      const widgets = document.querySelectorAll(".pow-widget");
  
      widgets.forEach(widget => {
          // Get the widget code from data attributes
          const htmlCode = widget.getAttribute("pow-widget-code-html");
          const cssCode = widget.getAttribute("pow-widget-code-css");
          const jsCode = widget.getAttribute("pow-widget-code-javascript");
  
          // Inject HTML
          const htmlWrapper = document.createElement("div");
          htmlWrapper.innerHTML = htmlCode;
          widget.appendChild(htmlWrapper);
  
          // Inject CSS
          if (cssCode) {
              const styleTag = document.createElement("style");
              styleTag.textContent = cssCode;
              document.head.appendChild(styleTag);
          }
  
          // Inject JavaScript
          if (jsCode) {
              const scriptTag = document.createElement("script");
              scriptTag.textContent = jsCode;
              document.body.appendChild(scriptTag);
          }
      });
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    
        document.querySelectorAll("div.pow-rtb.w-richtext, div.pow-rtb.pow-rtbinline.w-richtext").forEach(function(paragraph) {
          paragraph.innerHTML = paragraph.innerHTML.replace(/&nbsp;/g, ' ');
      });
    
    
      // Select all <details> elements on the page
      const detailsElements = document.querySelectorAll("details");
  
      detailsElements.forEach((details) => {
          // Extract content from <summary> and other child elements
          const summaryText = details.querySelector("summary").textContent;
          const contentElements = Array.from(details.childNodes).filter(node => node !== details.querySelector("summary"));
  
          // Create the new structure
          const powFolder = document.createElement("div");
          powFolder.classList.add("pow-folder");
  
          // Create the <a> tag with the .pow-folderheader class
          const folderHeader = document.createElement("a");
          folderHeader.href = "#";
          folderHeader.classList.add("pow-folderheader", "w-inline-block");
  
          // Create the <div> with .pow-text class for the summary content
          const powText = document.createElement("div");
          powText.classList.add("pow-foldertitle");
          powText.textContent = summaryText;
  
          // Append powText inside folderHeader, then folderHeader inside powFolder
          folderHeader.appendChild(powText);
          powFolder.appendChild(folderHeader);
  
          // Create the content div with .pow-foldercontent class and append the remaining nodes
          const folderContent = document.createElement("div");
          folderContent.classList.add("pow-foldercontent");
  
          contentElements.forEach((element) => {
              folderContent.appendChild(element);
          });
  
          // Append folderContent inside powFolder
          powFolder.appendChild(folderContent);
  
          // Replace original <details> element with the new structure
          details.parentNode.replaceChild(powFolder, details);
      });
  
      // Reinitialize Webflow interactions
      if (typeof Webflow !== 'undefined' && Webflow.require) {
          Webflow.require('ix2').init();
      }
  });
  
  // Select all <div> elements that directly wrap a <code> element
  document.querySelectorAll('div > code').forEach((codeElement) => {
      const parentDiv = codeElement.parentElement;
  
      // Apply styles to the wrapping <div> (parent of <code>)
      Object.assign(parentDiv.style, {
          padding: '0vh',
          backgroundColor: 'transparent',
          border: `var(--grid-width, 1px) solid var(--black-3, #000)`, // Border with size and color variables
          width: '100%',
          overflowX: 'auto',  // Makes it horizontally scrollable
          marginBottom: '2.5vh' // Adds 2.5vh bottom margin
  
  
      });
    
        // Convert <br> tags to newlines for proper code formatting
      let formattedCode = codeElement.innerHTML.replace(/<br\s*\/?>/gi, '\n').replace(/&nbsp;/g, ' ');
  
      // Wrap in <pre><code> and replace the original element
      const preElement = document.createElement('pre');
      const newCodeElement = document.createElement('code');
      newCodeElement.className = 'language-javascript'; // Change to 'language-markup' or any default
  
      // Set the inner text of the new <code> element
      newCodeElement.textContent = formattedCode;
      preElement.appendChild(newCodeElement);
      
      // Replace the original code element with the newly formatted <pre><code>
      codeElement.parentNode.replaceChild(preElement, codeElement);
    
    
        // Apply styles to the <code> element itself
      Object.assign(codeElement.style, {
          fontSize: '1.75vh',
          lineHeight: '2.5vh',
          backgroundColor: 'transparent'  // Ensures text background is transparent
      });
    });
  
  // Guide and info visibility functions
  function setInfoGroupVisibility(isVisible) {
    localStorage.setItem('infoGroupVisible', isVisible ? 'on' : 'off');
    applyInfoGroupVisibility();
  }
  
  function applyInfoGroupVisibility() {
    const visibility = localStorage.getItem('infoGroupVisible') || 'off';
    document.documentElement.classList.toggle('info-visible', visibility === 'on');
    document.documentElement.classList.toggle('info-hidden', visibility === 'off');
  }
  
  function setGuideSize(size) {
    localStorage.setItem('guideSize', size);
    applyGuideSize();
  }
  
  function applyGuideSize() {
    const guideSize = localStorage.getItem('guideSize') || 'off';
    document.documentElement.classList.remove('guide-small', 'guide-large', 'guide-off');
    document.documentElement.classList.add(`guide-${guideSize}`);
  }
    
  // Function to toggle dark mode
  function setDarkMode(isDark) {
    localStorage.setItem('darkMode', isDark ? 'on' : 'off');
    applyCurrentMode();
  }
  
  // Function to apply current mode and reapply styles
  function applyCurrentMode() {
    const darkMode = localStorage.getItem('darkMode') || 'off';
    if (darkMode === 'on') {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }
  
  
  // Event listeners for user interactions
  document.querySelector('.pow-info-on').addEventListener('click', () => setInfoGroupVisibility(true));
  document.querySelector('.pow-info-off').addEventListener('click', () => setInfoGroupVisibility(false));
  
  document.querySelector('.pow-guide-small').addEventListener('click', () => setGuideSize('small'));
  document.querySelector('.pow-guide-large').addEventListener('click', () => setGuideSize('large'));
  document.querySelector('.pow-guide-off').addEventListener('click', () => setGuideSize('off'));
  
  document.querySelector('.pow-dark-on').addEventListener('click', () => setDarkMode(true));
  document.querySelector('.pow-dark-off').addEventListener('click', () => setDarkMode(false));
  
  // Apply stored settings on page load
  window.addEventListener('DOMContentLoaded', () => {
    applyInfoGroupVisibility();
    applyGuideSize();
    applyCurrentMode();
  });
  
  // Function to apply the dark mode CSS variables
  function setDarkModeVariables() {
    document.documentElement.style.setProperty('--black-1', 'rgba(247, 247, 247, 1)');
    document.documentElement.style.setProperty('--black-2', 'rgba(247, 247, 247, 0.5)');
    document.documentElement.style.setProperty('--black-3', 'rgba(247, 247, 247, 0.07)');
    document.documentElement.style.setProperty('--white-1', 'rgba(8, 8, 8, 1)');
    document.documentElement.style.setProperty('--white-2', 'rgba(8, 8, 8, 0.5)');
    document.documentElement.style.setProperty('--white-3', 'rgba(8, 8, 8, 0.07)');
    document.documentElement.style.setProperty('--transparent', 'transparent');
    
    // Store these variable values in localStorage
    localStorage.setItem('theme-black-1', 'rgba(247, 247, 247, 1)');
    localStorage.setItem('theme-black-2', 'rgba(247, 247, 247, 0.5)');
    localStorage.setItem('theme-black-3', 'rgba(247, 247, 247, 0.07)');
    localStorage.setItem('theme-white-1', 'rgba(8, 8, 8, 1)');
    localStorage.setItem('theme-white-2', 'rgba(8, 8, 8, 0.5)');
    localStorage.setItem('theme-white-3', 'rgba(8, 8, 8, 0.07)');
    localStorage.setItem('theme-transparent', 'transparent');
  }
  
  // Function to apply the light mode CSS variables
  function setLightModeVariables() {
    document.documentElement.style.setProperty('--black-1', 'rgba(8, 8, 8, 1)');
    document.documentElement.style.setProperty('--black-2', 'rgba(8, 8, 8, 0.5)');
    document.documentElement.style.setProperty('--black-3', 'rgba(8, 8, 8, 0.07)');
    document.documentElement.style.setProperty('--white-1', 'rgba(247, 247, 247, 1)');
    document.documentElement.style.setProperty('--white-2', 'rgba(247, 247, 247, 0.5)');
    document.documentElement.style.setProperty('--white-3', 'rgba(247, 247, 247, 0.07)');
    document.documentElement.style.setProperty('--transparent', 'transparent');
    
    // Store these variable values in localStorage
    localStorage.setItem('theme-black-1', 'rgba(8, 8, 8, 1)');
    localStorage.setItem('theme-black-2', 'rgba(8, 8, 8, 0.5)');
    localStorage.setItem('theme-black-3', 'rgba(8, 8, 8, 0.07)');
    localStorage.setItem('theme-white-1', 'rgba(247, 247, 247, 1)');
    localStorage.setItem('theme-white-2', 'rgba(247, 247, 247, 0.5)');
    localStorage.setItem('theme-white-3', 'rgba(247, 247, 247, 0.07)');
    localStorage.setItem('theme-transparent', 'transparent');
  }
  
  // Function to retrieve and reapply stored CSS variables
  function applyStoredVariables() {
    document.documentElement.style.setProperty('--black-1', localStorage.getItem('theme-black-1'));
    document.documentElement.style.setProperty('--black-2', localStorage.getItem('theme-black-2'));
    document.documentElement.style.setProperty('--black-3', localStorage.getItem('theme-black-3'));
    document.documentElement.style.setProperty('--white-1', localStorage.getItem('theme-white-1'));
    document.documentElement.style.setProperty('--white-2', localStorage.getItem('theme-white-2'));
    document.documentElement.style.setProperty('--white-3', localStorage.getItem('theme-white-3'));
    document.documentElement.style.setProperty('--transparent', localStorage.getItem('theme-transparent'));
  }
  
  // Function to apply the current mode (dark or light)
  function applyCurrentMode() {
    const darkMode = localStorage.getItem('darkMode') || 'off';
    if (darkMode === 'on') {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
      applyStoredVariables(); // Reapply the stored dark mode variables
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
      applyStoredVariables(); // Reapply the stored light mode variables
    }
  }
  
  // Apply the mode and CSS variables as soon as the page loads
  document.addEventListener("DOMContentLoaded", function() {
    applyCurrentMode(); // Apply dark or light mode on page load
  });
  
  // Reapply the mode on window resize (or other re-render events)
  window.addEventListener('resize', function() {
    applyCurrentMode(); // Ensure dark or light mode persists after resizing
  });
  
  // Reapply the mode when adding new sticky notes
  const addButton = document.querySelector('.pow-additem'); // Ensure the button is selected
  addButton.addEventListener("click", function() {
    // Code to add the sticky note...
  });
  
  
   //Only backspace what doesn't match the previous string
   var typed = new Typed(".pow-bornfor", {
       strings:["Born for Stories", "Born for Love", "Born for Logos", "Born for Films", "Born for Grahpics", "Born for Innovation", "Born for Fun"],
      typeSpeed: 100,//typing speed
      backSpeed: 50, //erasing speed
      loop: true, // start back after ending typing
      smartBackspace: true, //this is on by default
      cursorChar: '™', // add custom cursor
    });
  
  
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
  
      
  // For existing items
  item.addEventListener('click', (e) => {
    if (e.target.classList.contains('pow-library-title')) {
      // Toggle draggable enable/disable
      const draggableInstance = item._draggable;
      if (draggableInstance) {
        if (draggableInstance.enabled()) {
          draggableInstance.disable();
        } else {
          draggableInstance.enable();
        }
      }
    }
  }); 
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
  
  
  
  document.addEventListener('DOMContentLoaded', function() {
    // Get the scrollable div
    var scrollableDiv = document.querySelector('.pow-content');
  
    // Prevent the page from scrolling when the mouse is over the scrollable div
    scrollableDiv.addEventListener('mouseover', function() {
      document.body.style.overflow = 'hidden';
    });
  
    // Allow the page to scroll again when the mouse leaves the scrollable div
    scrollableDiv.addEventListener('mouseout', function() {
      document.body.style.overflow = 'auto';
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    // Get the scrollable div
    var scrollableDiv = document.querySelector('.pow-info');
  
    // Prevent the page from scrolling when the mouse is over the scrollable div
    scrollableDiv.addEventListener('mouseover', function() {
      document.body.style.overflow = 'hidden';
    });
  
    // Allow the page to scroll again when the mouse leaves the scrollable div
    scrollableDiv.addEventListener('mouseout', function() {
      document.body.style.overflow = 'auto';
    });
  });
  
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
                  
                  // Get current position and order values
                  const positionElement = item.querySelector('.pow-item-position');
                  const orderElement = item.querySelector('.pow-item-order');
                  
                  // Parse existing values
                  const existingPosition = this.parsePositionOrderFormat(positionElement?.innerText || '');
                  const existingOrder = this.parsePositionOrderFormat(orderElement?.innerText || '');
                  
                  // Get new values
                  const newPosition = `${item.dataset.leftPercent},${item.dataset.topPercent}`;
                  const newOrder = item.style.zIndex || '1';
                  
                  // Update values for current page
                  existingPosition[pageIdentifier] = newPosition;
                  existingOrder[pageIdentifier] = newOrder;
                  
                  // Ensure default values exist
                  if (!('default' in existingPosition)) {
                      existingPosition['default'] = newPosition;
                  }
                  if (!('default' in existingOrder)) {
                      existingOrder['default'] = newOrder;
                  }
                  
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
  })();