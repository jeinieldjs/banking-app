let senderDropdown = document.querySelector("#sender-dropdown");
let senderBalance = document.querySelector("#sender-balance");

let receiverDropdown = document.querySelector("#receiver-dropdown");
let receiverBalance = document.querySelector("#receiver-balance");

let transferInput = document.querySelector("#transfer-input");
let transferButton = document.querySelector("#transfer-button");

let clients = JSON.parse(localStorage.getItem("clients"));
let transactions = JSON.parse(localStorage.getItem("transactions"));

// console.log(transactions);

function updateSenderValues() {
  clients.forEach((client, index) => {
    let senderOption = document.createElement("option");
    senderOption.value = client.name;
    senderOption.innerText = client.name;

    if (index === 0) {
      senderOption.setAttribute("selected", "selected");
    }

    senderDropdown.appendChild(senderOption);
  });
}

function updateReceiverValues() {
  receiverDropdown.innerHTML = "";
  let filteredClients = clients.filter(
    (client) => client.name !== senderDropdown.value
  );

  filteredClients.forEach((client, index) => {
    let receiverOption = document.createElement("option");
    receiverOption.value = client.name;
    receiverOption.innerText = client.name;

    if (index === 0) {
      receiverOption.setAttribute("selected", "selected");
    }

    receiverDropdown.appendChild(receiverOption);
  });
}

function findUser(user) {
  let selectedUser = clients.find((client) => client.name === user);
  return selectedUser;
}

function updateBalances() {
  let sender = findUser(senderDropdown.value);
  senderBalance.innerText = sender.balance.toFixed(2);

  let receiver = findUser(receiverDropdown.value);
  receiverBalance.innerText = receiver.balance.toFixed(2);

  transferInput.value = "";
  transferInput.focus();
}

function transfer() {
  let sender = findUser(senderDropdown.value);
  let receiver = findUser(receiverDropdown.value);
  let transferAmount = parseFloat(transferInput.value);

  if (transferInput.value.trim() === "") {
    alert("Please enter an amount to transfer.");
    return;
  }

  if (transferAmount <= 0) {
    alert("Transfer amount is invalid");
    return;
  }

  if (sender.balance < transferAmount) {
    alert("Sender's balance is insufficient for this transfer");
    return;
  }

  sender.balance = parseFloat(sender.balance) - parseFloat(transferAmount);
  receiver.balance = parseFloat(receiver.balance) + parseFloat(transferAmount);

  localStorage.setItem("clients", JSON.stringify(clients));

  // add enw transaction to localstorage 'transactions'

  const newTransaction = {
    type: "Transfer",
    sender: sender.name,
    receiver: receiver.name,
    amount: transferAmount,
    date: new Date().toLocaleString(),
  };

  const updatedTransactions = [...transactions, newTransaction];

  localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

  alert("Balance was transferred successfully");

  updateBalances();
}

senderDropdown.onchange = () => {
  updateReceiverValues();
  updateBalances();
};

receiverDropdown.onchange = () => {
  updateBalances();
};

window.onload = () => {
  updateSenderValues();
  updateReceiverValues();
  updateBalances();
};

transferButton.onclick = () => {
  transfer();
};
