let clients = JSON.parse(localStorage.getItem("clients"));

let clientsDropdown = document.querySelector("#clients-dropdown");
let clientBalance = document.querySelector("#client-balance");
let depositButton = document.querySelector("#deposit-button");
let depositInput = document.querySelector("#deposit-input");

clients.forEach((client, index) => {
  let clientOption = document.createElement("option");
  clientOption.value = client.name;
  clientOption.innerText = client.name;

  if (index === 0) {
    clientOption.setAttribute("selected", "selected");
  }

  clientsDropdown.appendChild(clientOption);
});

clientsDropdown.onchange = () => {
  updateValues();
};

let deposit = () => {
  let client = findUser(clientsDropdown.value);
  client.balance = parseInt(client.balance) + parseInt(depositInput.value);
  localStorage.setItem("clients", JSON.stringify(clients));
  updateValues();
  alert("Balance added successfully!");
};

let findUser = (name) => {
  return clients.find((client) => client.name === name);
};

let updateValues = () => {
  let selectedClient = findUser(clientsDropdown.value);
  clientBalance.innerText = selectedClient?.balance || 0;
  depositInput.placeholder = "Enter amount";
  depositInput.value = "";
};

depositButton.addEventListener("click", deposit);
updateValues();
