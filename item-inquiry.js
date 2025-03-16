document.addEventListener('DOMContentLoaded', function() {
    console.log('============ POW INLINE INPUT INITIALIZATION ============');
    
    // PART 1: Inline editable fields implementation
    const inlineInputs = document.querySelectorAll('.pow-item-inquiry-inline');
    console.log('Found', inlineInputs.length, 'pow-item-inquiry-inline elements');
    
    // Process each element
    inlineInputs.forEach((input, index) => {
      const uniqueId = `pow-item-inquiry-inline-link-${index}`;
      
      // Get input properties
      const inputName = input.getAttribute('name') || '';
      const inputId = input.getAttribute('id') || '';
      const placeholderText = input.getAttribute('placeholder') || '';
      const inputValue = input.value || '';
      
      // Create a contenteditable span
      const editableSpan = document.createElement('span');
      editableSpan.contentEditable = 'plaintext-only';
      editableSpan.className = input.className; // Preserve all original classes
      editableSpan.dataset.powItemInquiryInlineLinkId = uniqueId;
      editableSpan.dataset.powItemInquiryInlineLinkType = 'editable-span';
      editableSpan.dataset.powItemInquiryInlineLinkPlaceholder = placeholderText;
      
      // Keep original ID if present to maintain any relationships
      if (inputId) {
        editableSpan.id = inputId;
      }
      
      // Only apply minimal styling necessary for functionality
      editableSpan.style.display = 'inline';
      editableSpan.style.minWidth = '1px';
      editableSpan.style.wordBreak = 'break-word';
      editableSpan.style.wordWrap = 'break-word';
      editableSpan.style.whiteSpace = 'pre-wrap';
      editableSpan.style.verticalAlign = 'baseline';
      editableSpan.style.lineHeight = 'inherit';
      editableSpan.style.position = 'relative';
      
      // Create a hidden input to store the value
      const hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      hiddenInput.name = inputName;
      hiddenInput.value = inputValue;
      hiddenInput.dataset.powItemInquiryInlineLinkId = uniqueId;
      hiddenInput.dataset.powItemInquiryInlineLinkType = 'hidden-input';
      
      // Set initial state
      if (inputValue) {
        editableSpan.textContent = inputValue;
      } else {
        editableSpan.textContent = placeholderText;
        editableSpan.dataset.powItemInquiryInlineLinkIsPlaceholder = 'true';
        editableSpan.style.color = '#999'; // Only styling we change for placeholder
      }
      
      // Replace the original input
      const parent = input.parentNode;
      parent.insertBefore(editableSpan, input);
      parent.insertBefore(hiddenInput, input);
      parent.removeChild(input);
      
      // Handle mousedown to ensure we get the focus
      editableSpan.onmousedown = function(e) {
        e.preventDefault();
        this.focus();
        
        // If it's a placeholder, clear it immediately
        if (this.dataset.powItemInquiryInlineLinkIsPlaceholder === 'true') {
          this.textContent = '';
          delete this.dataset.powItemInquiryInlineLinkIsPlaceholder;
          this.style.color = ''; // Remove placeholder color
        }
        
        // Position cursor at end of text
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(this);
        range.collapse(false); // collapse to end
        selection.removeAllRanges();
        selection.addRange(range);
        
        return false;
      };
      
      // Input handling - update hidden input
      editableSpan.oninput = function() {
        const hidden = document.querySelector(`input[data-pow-item-inquiry-inline-link-id="${uniqueId}"]`);
        if (hidden) {
          hidden.value = this.textContent;
        }
        
        // Dynamic signature update within templates
        if (this.id && this.id.includes('-name')) {
          // Extract the template type (business, press, etc.)
          const templateType = this.id.split('-name')[0].split('-').pop();
          
          // Find corresponding signature element
          const signatureElement = document.getElementById(`pow-item-inquiry-signature-${templateType}`);
          if (signatureElement) {
            signatureElement.textContent = this.textContent;
          }
        }
      };
      
      // Blur handling - restore placeholder if empty
      editableSpan.onblur = function() {
        if (this.textContent.trim() === '') {
          this.textContent = this.dataset.powItemInquiryInlineLinkPlaceholder;
          this.dataset.powItemInquiryInlineLinkIsPlaceholder = 'true';
          this.style.color = '#999'; // Add placeholder color
          const hidden = document.querySelector(`input[data-pow-item-inquiry-inline-link-id="${uniqueId}"]`);
          if (hidden) hidden.value = '';
        }
      };
    });
    
    // PART 2: Template switching based on dropdown selection
    const subjectDropdown = document.getElementById('pow-item-inquiry-subject');
    let currentActiveTemplate = 'business'; // Default template
    
    if (subjectDropdown) {
      // Function to show the appropriate template
      const showTemplate = function(templateType) {
        // Update current active template tracking
        currentActiveTemplate = templateType;
        
        // Find all template containers
        const templateContainers = document.querySelectorAll('.pow-item-inquiry-email');
        
        // First set z-index low for all templates
        templateContainers.forEach(container => {
          container.style.zIndex = '1';
        });
        
        // Then set z-index high only for the selected template
        const selectedTemplate = document.getElementById(`pow-item-inquiry-email-${templateType}`);
        if (selectedTemplate) {
          selectedTemplate.style.zIndex = '10';
        }
      };
      
      // Handle dropdown change
      subjectDropdown.addEventListener('change', function() {
        const selectedValue = this.value;
        // Extract the type (business, press, etc.) from the value
        const templateType = selectedValue.split('-').pop();
        showTemplate(templateType);
      });
      
      // Initialize with the default selection (business)
      showTemplate('business');
    }
    
    // PART 3: Success page ID generation and signature syncing
    const sendButton = document.querySelector('.pow-item-inquiry-button');
    
    if (sendButton) {
      sendButton.addEventListener('click', function() {
        // 1. Get the name from the currently active template
        const activeNameField = document.getElementById(`pow-item-inquiry-${currentActiveTemplate}-name`);
        let userName = '';
        
        if (activeNameField) {
          userName = activeNameField.textContent || '';
          // If it's a placeholder, use empty string
          if (activeNameField.dataset.powItemInquiryInlineLinkIsPlaceholder === 'true') {
            userName = '';
          }
        }
        
        // 2. Set the signature on the success page
        const envelopeSignature = document.querySelector('.pow-item-inquiry-envelope-signature');
        if (envelopeSignature) {
          envelopeSignature.textContent = userName;
        }
        
        // 3. Generate and set the ID
        const envelopeId = document.querySelector('.pow-item-inquiry-envelope-id');
        if (envelopeId) {
          // Generate ID with Shanghai time (GMT+8)
          const shanghaiTime = getShanghaiTime();
          const dateString = formatDateForId(shanghaiTime);
          const randomNum = generateRandomNum(1, 9); // From 1 to 9 inclusive
          const formattedRandomNum = randomNum < 10 ? `0${randomNum}` : randomNum;
          
          // Format: P + date + random number
          const generatedId = `P${dateString}${formattedRandomNum}`;
          envelopeId.textContent = generatedId;
        }
      });
    }
    
    // Helper functions for ID generation
    
    // Get current time adjusted to Shanghai timezone (GMT+8)
    function getShanghaiTime() {
      const now = new Date();
      
      // Get UTC time in ms
      const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
      
      // Create new date object for Shanghai time (UTC+8)
      return new Date(utcTime + (3600000 * 8));
    }
    
    // Format date for ID: YYMMDD
    function formatDateForId(date) {
      const year = date.getFullYear().toString().slice(2); // Get last 2 digits of year
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
      const day = date.getDate().toString().padStart(2, '0');
      
      return `${year}${month}${day}`;
    }
    
    // Generate random number between min and max (inclusive)
    function generateRandomNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // PART 4: Lab hours status indicator
// Updated function with new calculation logic
function updateLabStatus() {
  const statusDot = document.querySelector('.pow-item-inquiry-status-dot');
  const statusText = document.querySelector('.pow-item-inquiry-status-text');
  
  if (!statusDot || !statusText) return; // Exit if elements don't exist
  
  // Get Shanghai time
  const shanghaiTime = getShanghaiTime();
  const day = shanghaiTime.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hour = shanghaiTime.getHours();
  const minute = shanghaiTime.getMinutes();
  const second = shanghaiTime.getSeconds();
  
  // Check if it's a weekend (0 = Sunday, 6 = Saturday)
  const isWeekend = (day === 0 || day === 6);
  
  // Check if current time is within working hours (9am-12pm or 1pm-6pm on weekdays)
  let isWorkingHours = false;
  if (!isWeekend) {
    if ((hour >= 9 && hour < 12) || (hour >= 13 && hour < 18)) {
      isWorkingHours = true;
    }
  }
  
  if (isWorkingHours) {
    // Calculate time until closing
    let targetHour, targetMinute;
    
    if (hour < 12) {
      // Morning shift - closing at 12pm
      targetHour = 12;
      targetMinute = 0;
    } else {
      // Afternoon shift - closing at 6pm
      targetHour = 18;
      targetMinute = 0;
    }
    
    // Calculate difference to target
    let hoursLeft = targetHour - hour - 1; // -1 because we count the remaining minutes
    let minutesLeft = 60 - minute;
    
    // Adjust for exact hour
    if (minute === 0) {
      hoursLeft += 1;
      minutesLeft = 0;
    }
    
    // Update status
    statusDot.style.backgroundColor = 'var(--pen)';
    statusDot.style.animation = 'pulse 2s infinite';
    
    // Set status text
    if (hoursLeft === 0 && minutesLeft === 0) {
      statusText.textContent = `Lab Open | Close in ${60 - second} s`;
    } else if (hoursLeft === 0) {
      statusText.textContent = `Lab Open | Close in ${minutesLeft} m`;
    } else {
      statusText.textContent = `Lab Open | Close in ${hoursLeft} h ${minutesLeft} m`;
    }
    
  } else {
    // Lab is closed - calculate time until opening
    let targetDay, targetHour;
    
    if (isWeekend) {
      // Target is Monday 9am
      targetDay = 1; // Monday
      targetHour = 9;
    } else if (hour < 9) {
      // Target is today 9am
      targetDay = day;
      targetHour = 9;
    } else if (hour >= 18) {
      // Target is tomorrow 9am (unless Friday, then Monday)
      if (day === 5) { // Friday
        targetDay = 1; // Monday
      } else {
        targetDay = (day + 1) % 7;
      }
      targetHour = 9;
    } else {
      // Must be lunch break (12pm-1pm)
      targetDay = day;
      targetHour = 13; // 1pm
    }
    
    // Calculate days difference
    let daysUntilTarget = (targetDay - day + 7) % 7;
    if (daysUntilTarget === 0 && (hour >= targetHour || (hour === targetHour - 1 && minute === 0))) {
      daysUntilTarget = 7; // Next week
    }
    
    // Calculate hours and minutes
    let hoursLeft, minutesLeft;
    
    if (daysUntilTarget === 0) {
      // Same day
      if (targetHour > hour) {
        hoursLeft = targetHour - hour - 1;
        minutesLeft = 60 - minute;
        
        // Adjust for exact hour
        if (minute === 0) {
          hoursLeft += 1;
          minutesLeft = 0;
        }
      } else {
        // This shouldn't happen with correct logic above
        hoursLeft = 0;
        minutesLeft = 0;
      }
    } else {
      // Different day
      hoursLeft = (daysUntilTarget - 1) * 24 + (24 - hour - 1) + targetHour;
      minutesLeft = 60 - minute;
      
      // Adjust for exact hour
      if (minute === 0) {
        hoursLeft += 1;
        minutesLeft = 0;
      }
    }
    
    // Update status
    statusDot.style.backgroundColor = 'var(--black-2)';
    statusDot.style.animation = 'none';
    
    // Set status text
    if (hoursLeft === 0 && minutesLeft === 0) {
      statusText.textContent = `Lab Closed | Open in ${60 - second} s`;
    } else if (hoursLeft === 0) {
      statusText.textContent = `Lab Closed | Open in ${minutesLeft} m`;
    } else {
      statusText.textContent = `Lab Closed | Open in ${hoursLeft} h ${minutesLeft} m`;
    }
  }
}

// Add the pulse animation if it doesn't exist
if (!document.querySelector('style#pow-item-inquiry-animations')) {
  const styleTag = document.createElement('style');
  styleTag.id = 'pow-item-inquiry-animations';
  styleTag.textContent = `
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.07; }
      100% { opacity: 1; }
    }
  `;
  document.head.appendChild(styleTag);
}

// Update initially
updateLabStatus();

// Update every minute
setInterval(updateLabStatus, 10000);
  });