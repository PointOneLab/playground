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