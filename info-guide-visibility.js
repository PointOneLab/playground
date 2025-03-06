// Guide and info visibility functions
function setInfoGroupVisibility(isVisible) {
    localStorage.setItem('infoGroupVisible', isVisible ? 'on' : 'off');
    applyInfoGroupVisibility();
  }
  /*
  function applyInfoGroupVisibility() {
    const visibility = localStorage.getItem('infoGroupVisible') || 'off';
    document.documentElement.classList.toggle('info-visible', visibility === 'on');
    document.documentElement.classList.toggle('info-hidden', visibility === 'off');
  }
  */
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
  //document.querySelector('.pow-info-on').addEventListener('click', () => setInfoGroupVisibility(true));
  //document.querySelector('.pow-info-off').addEventListener('click', () => setInfoGroupVisibility(false));
  
  document.querySelector('.pow-guide-small').addEventListener('click', () => setGuideSize('small'));
  document.querySelector('.pow-guide-large').addEventListener('click', () => setGuideSize('large'));
  document.querySelector('.pow-guide-off').addEventListener('click', () => setGuideSize('off'));
  
  document.querySelector('.pow-dark-on').addEventListener('click', () => setDarkMode(true));
  document.querySelector('.pow-dark-off').addEventListener('click', () => setDarkMode(false));
  
  // Apply stored settings on page load
  window.addEventListener('DOMContentLoaded', () => {
    // applyInfoGroupVisibility();
    applyGuideSize();
    applyCurrentMode();
  });