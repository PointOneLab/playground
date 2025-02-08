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