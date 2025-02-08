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
  
    Prism.highlightElement(codeElement);
  
      // Apply styles to the <code> element itself
    Object.assign(codeElement.style, {
        fontSize: '1.75vh',
        lineHeight: '2.5vh',
        backgroundColor: 'transparent'  // Ensures text background is transparent
    });
  });