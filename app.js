let logDetails = document.createElement('div');
logDetails.setAttribute('id','log-details');
document.body.appendChild(logDetails);

let logHeader = document.createElement('div');
logHeader.setAttribute('class', 'log-header')
let logText = document.createElement('h1');
logText.textContent = 'ADMIN LOG IN';
let clientLogLink = document.createElement('p');
clientLogLink.innerHTML = 'Not an Admin? Click <a href="clientlog.html">here</a>.';
logHeader.appendChild(logText);
logHeader.appendChild(clientLogLink);
logDetails.appendChild(logHeader);
logHeader.style.padding = '10px';
logHeader.style.textAlign = 'center';

let usernameInput = document.createElement('div');
let passwordInput = document.createElement('div');
usernameInput.setAttribute('class','log-input');
passwordInput.setAttribute('class','log-input');
usernameInput.innerHTML ='<input type="text" id="username" placeholder="USERNAME"><br>';
passwordInput.innerHTML ='<input type="password" id="password" placeholder="PASSWORD">';
logDetails.appendChild(usernameInput);
logDetails.appendChild(passwordInput);

let logButton = document.createElement('button');
logButton.setAttribute('id', 'log-button');
logButton.textContent = 'LOG IN';
logDetails.appendChild(logButton);

logButton.addEventListener('click', function() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (username === 'Admin1' && password === 'admin123') {
        localStorage.setItem('loggedInUser', username);
        window.location.href = 'dashboard.html';
    } else {
        alert('Login failed. Please check your username and password.');
    }
});





