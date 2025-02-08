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