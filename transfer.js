let senderDropdown = document.querySelector("#sender-dropdown");
let senderBalance = document.querySelector("#sender-balance");

let receiverDropdown = document.querySelector("#receiver-dropdown");
let receiverBalance = document.querySelector("#receiver-balance");

let transferInput = document.querySelector("#transfer-input");
let transferButton = document.querySelector("#transfer-button");

let clients = JSON.parse(localStorage.getItem("clients"));

// clients.forEach((client, index) => {
//   let senderOption = document.createElement("option");
//   senderOption.value = client.name;
//   senderOption.innerText = client.name;

//   if (index === 0) {
//     senderOption.setAttribute("selected", "selected");
//   }

//   senderDropdown.appendChild(senderOption);
// });

// senderDropdown.onchange = () => {
//   let filteredClients = clients.filter(
//     (client) => client.name !== senderDropdown.value
//   );

//   filteredClients.forEach((client, index) => {
//     let receiverOption = document.createElement("option");
//     receiverOption.value = client.name;
//     receiverOption.innerText = client.name;

//     if (index === 0) {
//       receiverOption.setAttribute("selected", "selected");
//     }

//     receiverDropdown.appendChild(receiverOption);
//   });
// };

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
  senderBalance.innerText = sender.balance;

  let receiver = findUser(receiverDropdown.value);
  receiverBalance.innerText = receiver.balance;
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
