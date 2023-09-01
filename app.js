class Client {
  constructor(name, email, userId, balance) {
    this.name = name;
    this.email = email;
    this.userId = userId;
    this.balance = balance;
  }

  displayInfo() {
    return `${this.name} - ${this.email} (ID: ${this.userId}) - Balance: $${this.balance}`;
  }
}

let initialClients = [
  new Client(
    "Ayala, Marissa Yap",
    "mayala@yahoo.com",
    "ID1692264379273",
    85000
  ),
  new Client(
    "Cruz, Bruno Solano",
    "brunocruz@yahoo.com",
    "ID1679072730309",
    250000
  ),
  new Client(
    "Felipe, Edward Daez",
    "edfelipe@yahoo.com",
    "ID1692264905895",
    85000
  ),
  new Client("Lim, Dexter Go", "dexlim@yahoo.com", "ID1686585600062", 39000),
  new Client(
    "Maranan, Pedro Reyes",
    "pedreymaranan@gmail.com",
    "ID1692264222480",
    15000
  ),
  new Client(
    "Medina, Anna Perez",
    "annamedina@gmail.com",
    "ID1692258955919",
    5000
  ),
  new Client(
    "Pena, Chay Marquez",
    "chaypena27@gmail.com",
    "ID1583371815753",
    300
  ),
];

const initialTransactions = [
  {
    type: "Transfer",
    sender: "Ayala, Marissa Yap",
    receiver: "Cruz, Bruno Solano",
    date: new Date().toLocaleString(),
    amount: 500,
  },
  {
    type: "Withdraw",
    user: "Ayala, Marissa Yap",
    date: new Date().toLocaleString(),
    amount: 500,
  },
  {
    type: "Deposit",
    user: "Ayala, Marissa Yap",
    date: new Date().toLocaleString(),
    amount: 1000,
  },
];

let transactions = localStorage.getItem("transactions")
  ? JSON.parse(localStorage.getItem("transactions"))
  : initialTransactions;

let clients = localStorage.getItem("clients")
  ? JSON.parse(localStorage.getItem("clients"))
  : initialClients;

localStorage.setItem("transactions", JSON.stringify(transactions));
localStorage.setItem("clients", JSON.stringify(clients));

let logDetails = document.createElement("div");
logDetails.setAttribute("id", "log-details");
document.body.appendChild(logDetails);

let logHeader = document.createElement("div");
logHeader.setAttribute("class", "log-header");
let logText = document.createElement("h1");
logText.textContent = "ADMIN LOG IN";
let clientLogLink = document.createElement("p");
clientLogLink.innerHTML =
  'Not an Admin? Click <a href="clientlog.html">here</a>.';
logHeader.appendChild(logText);
logHeader.appendChild(clientLogLink);
logDetails.appendChild(logHeader);
logHeader.style.padding = "10px";
logHeader.style.textAlign = "center";

let usernameInput = document.createElement("div");
let passwordInput = document.createElement("div");
usernameInput.setAttribute("class", "log-input");
passwordInput.setAttribute("class", "log-input");
usernameInput.innerHTML =
  '<input type="text" id="username" placeholder="USERNAME"><br>';
passwordInput.innerHTML =
  '<input type="password" id="password" placeholder="PASSWORD">';
logDetails.appendChild(usernameInput);
logDetails.appendChild(passwordInput);

let logButton = document.createElement("button");
logButton.setAttribute("id", "log-button");
logButton.textContent = "LOG IN";
logDetails.appendChild(logButton);

logButton.addEventListener("click", function () {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (username === "Admin1" && password === "admin123") {
    localStorage.setItem("loggedInUser", username);
    window.location.href = "dashboard.html";
  } else {
    alert("Login failed. Please check your username and password.");
  }
});
