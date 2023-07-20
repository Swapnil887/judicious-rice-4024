const loaderOverlay = document.getElementById("loader-overlay");
const container = document.getElementById("container");


let b1 = document.getElementById("b1")
let email = document.getElementById("input1")
let password = document.getElementById("input2")
let bshub = document.getElementById("bshub")
const urlParams = new URLSearchParams(window.location.search);
const encodedData = urlParams.get('user');

// Decode the URL-safe string and parse it back into an object
let userData = JSON.parse(decodeURIComponent(encodedData));

// Access the user properties as needed
if (userData != null) {
    Swal.fire(
        'Good job!',
        'Email Confirmed!',
        'success'
    )
    setTimeout(() => {
        window.location.href = "./login.html"
    }, 2000);
}

b1.addEventListener("click", () => {
    let data = {
        email: email.value,
        password: password.value
    }
    fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            if (res == "NotFound") {
                Swal.fire({
                    title: 'Error!',
                    text: 'Email Not Found',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            } else if (res == "Confirm your Account") {
                Swal.fire({
                    title: 'Error!',
                    text: 'Confirm your Account to Login',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
            else if (res == "Incorrect Password") {
                Swal.fire({
                    title: 'Error!',
                    text: 'Incorrect Password',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            } else {
                if (res.role == "client") {
                    localStorage.clear()
                    localStorage.setItem("user", JSON.stringify(res))
                    Swal.fire(
                        'Good job!',
                        'Logging Successful!',
                        'success'
                    )
                    setTimeout(() => {
                        window.location.href = "./index.html"
                    }, 1500);
                } else {
                    localStorage.clear()
                    localStorage.setItem("user", JSON.stringify(res))
                    Swal.fire(
                        'Good job!',
                        'Logging Successful!',
                        'success'
                    )
                    setTimeout(() => {
                        window.location.href = "./lawyer.html"
                    }, 1500);
                }

            }
        })
        .catch((error) => {
            Swal.fire({
                title: 'Error!',
                text: 'Fetching Error',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            console.log(error);
        })
        .finally(() => {
            loaderOverlay.style.display = "none";
            container.style.opacity = "1";
        })
    loaderOverlay.style.display = "flex";
    container.style.opacity = "0.8";
})