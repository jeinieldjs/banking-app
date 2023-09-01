let clients = JSON.parse(localStorage.getItem("clients"));
let transactions = JSON.parse(localStorage.getItem("transactions"));

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
  let depositAmount = parseFloat(depositInput.value);

  if (depositInput.value.trim() === "") {
    alert("Please enter an amount to deposit");
    return;
  }

  if (depositAmount <= 0 || isNaN(depositAmount)) {
    alert("Amount to be deposited is invalid.");
    return;
  }

  client.balance = parseFloat(client.balance) + depositAmount;
  localStorage.setItem("clients", JSON.stringify(clients));

  // added new deposit log on transactions storage

  const newTransaction = {
    type: "Deposit",
    user: client.name,
    amount: depositAmount,
    date: new Date().toLocaleString(),
  };

  const updatedTransactions = [...transactions, newTransaction];

  localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

  updateValues();
  alert("Balance added successfully!");
};

let findUser = (name) => {
  return clients.find((client) => client.name === name);
};

let updateValues = () => {
  let selectedClient = findUser(clientsDropdown.value);
  clientBalance.innerText = selectedClient?.balance.toFixed(2) || 0;
  depositInput.value = "";
  depositInput.focus();
};

depositButton.addEventListener("click", deposit);
updateValues();
