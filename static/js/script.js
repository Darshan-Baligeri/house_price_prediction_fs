// Function to handle form submission
async function submitForm(event) {
    event.preventDefault();  // Prevent form submission to refresh the page

    const form = document.getElementById('inputForm');
    const formData = new FormData(form);

    // Show a loading indicator while waiting for the response
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerText = 'Processing...';

    try {
        // Send data to the Flask backend for prediction
        const response = await fetch('/predict', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error ' + response.status + ': ' + response.statusText);
        }

        const data = await response.json();

        // Re-enable the button after the response
        submitButton.disabled = false;
        submitButton.innerText = 'Submit';

        // Display the prediction or error
        if (data.error) {
            alert("Error: " + data.error);
        } else {
            // Take the absolute value (in case the result is negative) and multiply by 1000
            const prediction = Math.abs(data.prediction);

            // Round the value to an integer and display the result
            const formattedPrediction = Math.floor(prediction); // or .toFixed(0)

            alert("Predicted house price: $" + formattedPrediction);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error occurred while making prediction');

        // Re-enable the button if there's an error
        submitButton.disabled = false;
        submitButton.innerText = 'Submit';
    }
}

// Add the submit event listener to the form
document.getElementById('inputForm').addEventListener('submit', submitForm);
