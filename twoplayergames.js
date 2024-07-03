// Array of instructions and notices
const content = [
    { type: 'instruction', text: "First, go to <a href=\'https://v6.wiki\'>v6.wiki</a> or use the page on Classboard" },
    { type: 'instruction', text: "Then, once there, go to Search, then type in 'twoplayergames.org'" },
];

let currentStep = -1; // Start from step 0 (welcome message)
const instructionsElement = document.getElementById("instructions");
const currentStepElement = document.getElementById("currentStep");
const totalStepsElement = document.getElementById("totalSteps");

// Initialize step counter
updateStepCounter();

// Function to update the step counter display
function updateStepCounter() {
    currentStepElement.textContent = currentStep + 1;
    totalStepsElement.textContent = content.length; // Display total steps including notice
}

// Function to display the next step with a slide-in animation
function nextStep() {
    if (currentStep < content.length - 1) {
        currentStep++;
        instructionsElement.style.animation = "slide-out 0.5s ease-in forwards"; // Slide-out animation
        setTimeout(() => {
            const item = content[currentStep];
            if (item.type === 'instruction') {
                instructionsElement.innerHTML = `<p>Step ${currentStep + 1}: ${item.text}</p>`;
            } else if (item.type === 'notice') {
                instructionsElement.innerHTML = `<p class="notice">${item.text}</p>`;
            }
            instructionsElement.style.animation = "slide-in 0.5s ease-out forwards"; // Slide-in animation
            updateStepCounter(); // Update step counter after transition
        }, 500); // Wait for slide-out animation to complete (500ms)
    } else {
        instructionsElement.innerHTML = "<p>Enjoy the new game ;D</p>";
        document.getElementById("nextButton").style.display = "none"; // Hide the button
        document.getElementById("checkIcon").style.display = "block"; // Show the check mark icon
    }
}