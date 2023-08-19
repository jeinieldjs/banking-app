let clients = JSON.parse(localStorage.getItem("clients"));
let clientLogDetails = document.createElement('div');
clientLogDetails.setAttribute('id', 'log-details');
document.body.appendChild(clientLogDetails);

let clientLogHeader = document.createElement('div');
clientLogHeader.setAttribute('class', 'log-header')
let clientLogText = document.createElement('h1');
clientLogText.textContent = 'CLIENT LOG IN';
let adminLogLink = document.createElement('p');
adminLogLink.innerHTML = 'Not a client? Click <a href="index.html">here</a>.';
clientLogHeader.appendChild(clientLogText);
clientLogHeader.appendChild(adminLogLink);
clientLogDetails.appendChild(clientLogHeader);
clientLogHeader.style.padding = '10px';
clientLogHeader.style.textAlign = 'center';

let emailInput = document.createElement('div');
let passwordInput = document.createElement('div');
emailInput.setAttribute('class', 'log-input');
passwordInput.setAttribute('class', 'log-input');
emailInput.innerHTML = '<input type="email" id="email" placeholder="E-MAIL"><br>';
passwordInput.innerHTML = '<input type="password" id="password" placeholder="PASSWORD">';
clientLogDetails.appendChild(emailInput); 
clientLogDetails.appendChild(passwordInput);

let logButton = document.createElement('button');
logButton.setAttribute('id', 'log-button');
logButton.textContent = 'LOG IN';
clientLogDetails.appendChild(logButton);


logButton.addEventListener('click', function () {
    let loggedEmail = document.getElementById('email').value; 
    let loggedPassword = document.getElementById('password').value;
    const existingClient = clients.find(client => client.email === loggedEmail);

    if (existingClient) {
        if(existingClient.userId === loggedPassword){
            let loggedUsername = existingClient.name;
            localStorage.setItem('loggedInUser', loggedUsername);
            window.location.href = 'clientdash.html';
        } else {
            alert('Login failed. Please check password.');
        }
    } else {
        alert('Login failed. Email entered is not registered to an existing client.');
    }
});

//pwede na mag log in si client. next to do: clientdash.html
