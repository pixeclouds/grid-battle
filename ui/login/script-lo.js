document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('active');
});


// Function to switch between login and signup forms
function switchForm(formId) {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById(formId).style.display = 'block';
}

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const errorMessages = document.querySelectorAll(".error-message");


// handle player login
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;
    const errorMessage = errorMessages[0]
    
    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            // Store token in local storage
            localStorage.setItem("token", data.token);
            // Redirect to invites page
            window.location.href = "/invites";
        } else {
            errorMessage.innerHTML = data.err
            errorMessage.style.display = "block";
        }
    } catch (error) {
        console.error("An error occurred");
    }
});


// handle player signup
signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = signupForm.username.value;
    const password = signupForm.password.value;
    const errorMessage = errorMessages[1]
    
    try {
        const response = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            // Store token in local storage
            localStorage.setItem("token", data.token);
            // Redirect to invites page
            window.location.href = "/invites";
        } else {
            errorMessage.innerHTML = data.err
            errorMessage.style.display = "block";
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

// signupForm.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const newUsername = signupForm["new-username"].value;
//     const newPassword = signupForm["new-password"].value;
    
//     try {
//         const response = await fetch("/api/signup", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ username: newUsername, password: newPassword })
//         });

//         const data = await response.json();
        
//         if (response.ok) {
//             // Store token in local storage
//             localStorage.setItem("token", data.token);
//             // Redirect to invites page
//             window.location.href = "invites.html";
//         } else {
//             errorMessages[1].style.display = "block";
//         }
//     } catch (error) {
//         console.error("An error occurred:", error);
//     }
// });
