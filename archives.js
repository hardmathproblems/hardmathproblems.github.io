document.getElementById('navigationForm').onsubmit = function() {
    var selectedDestination = document.getElementById('destination').value;
    if (selectedDestination) {
        window.location.href = selectedDestination;
    }
    return false; // Prevent form from actually submitting
};