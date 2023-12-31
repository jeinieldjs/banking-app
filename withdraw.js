let clients = JSON.parse(localStorage.getItem("clients"));
let transactions = JSON.parse(localStorage.getItem("transactions"));

let clientsDropdown = document.querySelector("#clients-dropdown");
let clientBalance = document.querySelector("#client-balance");
let withdrawButton = document.querySelector("#withdraw-button");
let withdrawInput = document.querySelector("#withdraw-input");

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

let withdraw = () => {
  let client = findUser(clientsDropdown.value);
  let withdrawAmount = parseFloat(withdrawInput.value);

  if (withdrawInput.value.trim() === "") {
    alert("Please enter an amount to withdraw.");
    return;
  }

  if (withdrawAmount > client.balance) {
    alert("Client has insufficient funds for this transaction.");
    return;
  }

  if (withdrawAmount <= 0) {
    alert("Amount to be withdrawn is invalid.");
    return;
  }

  client.balance = parseFloat(client.balance) - withdrawAmount;
  localStorage.setItem("clients", JSON.stringify(clients));

  const newTransaction = {
    type: "Withdraw",
    user: client.name,
    amount: withdrawAmount,
    date: new Date().toLocaleString(),
  };

  const updatedTransactions = [...transactions, newTransaction];

  localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

  updateValues();
  alert("Balance withdrawn successfully!");
};

let findUser = (name) => {
  return clients.find((client) => client.name === name);
};

let updateValues = () => {
  let selectedClient = findUser(clientsDropdown.value);
  clientBalance.innerText = selectedClient?.balance.toFixed(2) || 0;
  withdrawInput.value = "";
  withdrawInput.focus();
};

withdrawButton.addEventListener("click", withdraw);
updateValues();
