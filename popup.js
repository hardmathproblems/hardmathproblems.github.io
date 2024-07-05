document.addEventListener("DOMContentLoaded", function() {
    // Show the popup with animation if the checkbox is not checked or cookie not set
    const popup = document.getElementById("popup");
    const popupContent = document.querySelector(".popup-content");
    const dontShowCheckbox = document.getElementById("dontShow");

    function getCookie(name) {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    }

    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + '=' + value + ';expires=' + expires.toUTCString();
    }

    if (!getCookie("dontShowPopup")) {
        popup.style.display = "flex";
        popupContent.style.animation = "slideUp 0.5s forwards";
    }

    function closePopup() {
        // Slide up out animation
        popupContent.style.animation = "slideUpOut 0.5s forwards";

        // Hide the popup after the animation ends
        setTimeout(function() {
            popup.style.display = "none";
        }, 500); // Match this duration with the animation duration
    }

    document.querySelector(".close-btn").addEventListener("click", function() {
        if (dontShowCheckbox.checked) {
            setCookie("dontShowPopup", "true", 30); // Set cookie for 30 days
        } else {
            document.cookie = "dontShowPopup=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Delete cookie
        }
        closePopup();
    });

    window.addEventListener("click", function(event) {
        if (event.target == popup) {
            if (dontShowCheckbox.checked) {
                setCookie("dontShowPopup", "true", 30); // Set cookie for 30 days
            } else {
                document.cookie = "dontShowPopup=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Delete cookie
            }
            closePopup();
        }
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            if (dontShowCheckbox.checked) {
                setCookie("dontShowPopup", "true", 30); // Set cookie for 30 days
            } else {
                document.cookie = "dontShowPopup=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Delete cookie
            }
            closePopup();
        }
    });
});