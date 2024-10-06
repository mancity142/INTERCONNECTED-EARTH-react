// Function to check the user's answer for species extinction
function checkAnswer(type) {
    let userInput = '';
    let feedbackElement = null;

    // Check the type of question and get the user input and feedback element accordingly
    if (type === 'species') {
        userInput = document.getElementById('inputSpecies').value.toLowerCase();
        feedbackElement = document.getElementById('speciesFeedback');

        if (userInput.includes('food chain') || userInput.includes('ecosystem')) {
            feedbackElement.innerText = "Great job! You're right! The extinction of one species can disrupt the entire ecosystem!";
        } else {
            feedbackElement.innerText = "Interesting thought! Remember, every species plays a role in its ecosystem.";
        }
    } else if (type === 'pollution') {
        userInput = document.getElementById('inputPollution').value.toLowerCase();
        feedbackElement = document.getElementById('pollutionFeedback');

        if (userInput.includes('harm') || userInput.includes('kill') || userInput.includes('destroy')) {
            feedbackElement.innerText = "Exactly! Pollution can be deadly to marine life!";
        } else {
            feedbackElement.innerText = "Think about it: pollution can disrupt entire habitats!";
        }
    }
}

// Function to show a random fact about the interconnected earth
function showFact() {
    const facts = [
        "Did you know? Bees are responsible for pollinating a third of the food we eat!",
        "Every year, an estimated 2.5 trillion plastic bottles are used worldwide.",
        "Coral reefs support around 25% of all marine life but are facing serious threats from climate change.",
        "One tree can absorb approximately 48 pounds of carbon dioxide per year.",
        "About 1 million marine creatures are killed each year due to plastic pollution."
    ];

    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById('fact').innerText = randomFact;
    document.getElementById('fact').classList.remove('hidden');
}

// Function to show more information about a topic
function showDetails(detailsId) {
    const detailsElement = document.getElementById(detailsId);
    detailsElement.classList.toggle('hidden'); // Toggle the hidden class
}

// Function to redirect to the simulator
function redirectToSimulator() {
    window.location.href = 'https://Antony-Rubens.github.io/INTERCONNECTED-EARTH-react';
}

// Event Listeners for Buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.submit-button').forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type'); // Get the type from data attribute
            checkAnswer(type);
        });
    });

    document.getElementById('factButton').addEventListener('click', showFact);
    document.getElementById('simulatorButton').addEventListener('click', redirectToSimulator);
});