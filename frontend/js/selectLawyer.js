  // JavaScript code to handle form submission
  document.getElementById("searchForm").addEventListener("submit", function(event) {
    console.log("hello")
  event.preventDefault(); // Prevent form submission
  
//       var location = document.querySelector('input[name="location"]').value;
  var speciality = document.querySelector('select[name="speciality"]').value;
//         // Construct the fetch URL with query parameters
//   var url = ''  + '&speciality=' + encodeURIComponent(speciality);

// Perform the fetch request
console.log(speciality)
fetch(`http://localhost:8080/client/get?specialization=${speciality}`)
.then(function(response) {
return response.json();
})
.then(function(data) {
// Handle the response data and update the search results
updateSearchResults(data);
})
.catch(function(error) {
console.log('An error occurred:', error);
});
});


function updateSearchResults(results) {
var searchResultsElement = document.getElementById('searchResults');
searchResultsElement.innerHTML = ''; // Clear previous results

// Iterate over the results and create HTML elements to display them
results.forEach(function(result) {
var img = document.createElement("img")
var li = document.createElement('li');
var h2 = document.createElement('h2');
var p1 = document.createElement('p');
var p2 = document.createElement('p');
var p3 = document.createElement('p');
var p4 = document.createElement('p');
var p5 = document.createElement('p');
var p6 = document.createElement('div');
var p7 = document.createElement('button');

h2.textContent = result.name;
img.src = "https://img.com/static/img/img-logo.png"
p1.textContent = 'Speciality: ' + result.specialization;
p2.textContent = 'Location: ' + result.location;
p3.textContent = 'Email: ' + result.contact.email;
p4.textContent = 'Contact No: ' + result.contact.phone;
p5.textContent = 'Rating: ' + result.rating;

p7.innerText = 'View slots';
p7.addEventListener('click', createButtonClickListener(result.sloats,result));

li.appendChild(h2);
li.appendChild(p1);
li.appendChild(p2);
li.appendChild(p3);
li.appendChild(p4);
li.appendChild(p5);
li.appendChild(p6);
li.appendChild(p7);
li.appendChild(img)
searchResultsElement.appendChild(li);
});

// Function factory to create separate event listeners
function createButtonClickListener(sloats,r) {

console.log(results,"true")//[a,b]
return function() {
  var p6 = this.parentNode.querySelector('div');
  p6.innerHTML = ''; // Clear previous slot buttons

  if (Object.keys(sloats).length === 0) {
    p6.innerText = 'Not available';
  } else {
    for (var key in sloats) {
      if (sloats.hasOwnProperty(key) && sloats[key] !== "booked") {
        var button = document.createElement('button');
        button.innerText = key;
        button.addEventListener('click', createSlotClickListener(key, sloats[key],r));
        p6.appendChild(button);
      }
    }
  }
};
}

// Function factory to create separate slot click listeners
function createSlotClickListener(slot, slotValue,r) {
return async function() {
  console.log(slot, slotValue,r);

  var clientEmail='chinachin1975@gmail.com'
  var lawyerId=r._id;
  var bookingsloat = slot
await fetch(`http://localhost:8080/client/book/?clientEmail=${clientEmail}&&lawyerId=${lawyerId}&&bookingsloat=${bookingsloat}`)
  .then(res=>res.json())
  .then(data=>{alert(data)})
  .catch(err=>alert(err.message))
  localStorage.setItem("id", lawyerId)
  window.location.href = "payment.html"
};

;

// 

}
}
