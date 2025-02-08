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