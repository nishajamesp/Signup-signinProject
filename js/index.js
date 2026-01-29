let users = JSON.parse(localStorage.getItem("users")) || [];

function togglePassword(id) {
    let input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
}

function register(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let city = document.getElementById("city").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (!/^[A-Za-z ]+$/.test(city)) {
        alert("City must contain only letters");
        return;
    }

    if (!/^\d{10}$/.test(phone)) {
        alert("Phone number must be 10 digits");
        return;
    }

    if (!/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(password)) {
        alert("Password must contain letters & numbers (min 8 chars)");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    if (users.find(u => u.email === email)) {
        alert("User already exists");
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful");
    window.location.href = "SignIn.html";
}

function login(e) {
    e.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert("Invalid credentials");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "travelapp.html";
}

function checkAuth() {
    if (!localStorage.getItem("currentUser")) {
        window.location.href = "SignIn.html";
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "SignIn.html";
}
