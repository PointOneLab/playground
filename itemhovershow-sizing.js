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