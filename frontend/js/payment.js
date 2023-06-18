// Get the payment form element

const paymentForm = document.getElementById('paymentForm');

var data = localStorage.getItem('id')
data = JSON.parse(data)
console.log(data)


var name = document.querySelector("#name")
var speciality = document.querySelector("#speciality")
var location = document.querySelector("#location")
var email = document.querySelector("#email")
var contectno = document.querySelector("#contectno")
var Rating = document.querySelector("#Rating")

name.innerText = data.name;
// speciality.innerText = 

// Add a submit event listener to the form
paymentForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  // Get the form data
  const formData = new FormData(paymentForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const cardNumber = formData.get('cardNumber');
  const expiry = formData.get('expiry');
  const cvv = formData.get('cvv');

  // Perform payment processing
  // Replace this code with your actual payment processing logic
  // For example, you can make an API request to a payment gateway
  // and handle the response accordingly
  processPayment(name, email, cardNumber, expiry, cvv);
});

// Function to simulate payment processing
function processPayment(name, email, cardNumber, expiry, cvv) {
  // Display a loading message
  showLoadingMessage();

  // Simulate a delay to mimic payment processing
  setTimeout(function () {
    // Hide the loading message
    hideLoadingMessage();

    // Show a success message
    showSuccessMessage();
  }, 2000);
}

// Function to display a loading message
function showLoadingMessage() {
  const paymentForm = document.getElementById('paymentForm');
  const loadingMessage = document.createElement('p');
  loadingMessage.textContent = 'Processing payment...';
  loadingMessage.classList.add('loading-message');
  paymentForm.appendChild(loadingMessage);
}

// Function to hide the loading message
function hideLoadingMessage() {
  const loadingMessage = document.querySelector('.loading-message');
  if (loadingMessage) {
    loadingMessage.remove();
  }
}

// Function to display a success message
function showSuccessMessage() {
  const paymentForm = document.getElementById('paymentForm');
  const successMessage = document.createElement('p');
  successMessage.textContent = 'Payment successful!';
  successMessage.classList.add('success-message');
  paymentForm.appendChild(successMessage);

  // Reset the form after a success message is shown
  paymentForm.reset();
}
