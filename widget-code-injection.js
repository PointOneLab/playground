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