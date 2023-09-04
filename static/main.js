// Get a reference to the form and the result element
const form = document.querySelector('form');
const resultElement = document.querySelector('.result');

// Add an event listener to the form for handling form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  
  // Get the form data as an object
  const formData = new FormData(form);
  
  // Create an object to store the form data
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });
  
  // Send a POST request to the backend with the form data
  try {
    const response = await fetch('/api/submit-application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataObject),
    });
    
    if (response.ok) {
      const data = await response.json();
      // Update the result element with the response data
      resultElement.textContent = `Application Result: ${data.outcome}`;
    } else {
      resultElement.textContent = 'Error submitting the application';
    }
  } catch (error) {
    console.error(error);
    resultElement.textContent = 'An error occurred while submitting the application';
  }
});
