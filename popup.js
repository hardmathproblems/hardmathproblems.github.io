document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("popup");
    const popupContent = document.querySelector(".popup-content");
    const closeBtn = document.querySelector(".close-btn");

    if (popup && popupContent && closeBtn) {
        // Show the popup with animation
        popup.style.display = "flex";
        popupContent.style.animation = "slideUp 0.5s forwards";

        function closePopup() {
            // Slide up out animation
            popupContent.style.animation = "slideUpOut 0.5s forwards";

            // Hide the popup after the animation ends
            setTimeout(function() {
                popup.style.display = "none";
            }, 500); // Match this duration with the animation duration
        }

        closeBtn.addEventListener("click", function() {
            closePopup();
        });
        

        window.addEventListener("click", function(event) {
            if (event.target === popup) {
                closePopup();
            }
        });

        document.addEventListener("keydown", function(event) {
            if (event.key === "Escape") {
                closePopup();
            }
        }); 

    } else {
        console.error("One or more required elements not found.");
    }
});