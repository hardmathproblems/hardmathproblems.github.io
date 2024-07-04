document.addEventListener("DOMContentLoaded", function() {
    // Show the popup with animation
    const popup = document.getElementById("popup");
    const popupContent = document.querySelector(".popup-content");
    
    popup.style.display = "flex";
    popupContent.style.animation = "slideUp 0.5s forwards";

    document.querySelector(".close-btn").addEventListener("click", function() {
        // Slide up out animation
        popupContent.style.animation = "slideUpOut 0.5s forwards";
        
        // Hide the popup after the animation ends
        setTimeout(function() {
            popup.style.display = "none";
        }, 500); // Match this duration with the animation duration
    });

    window.addEventListener("click", function(event) {
        if (event.target == popup) {
            // Slide up out animation
            popupContent.style.animation = "slideUpOut 0.5s forwards";
            
            // Hide the popup after the animation ends
            setTimeout(function() {
                popup.style.display = "none";
            }, 500); // Match this duration with the animation duration
        }
    });
});
