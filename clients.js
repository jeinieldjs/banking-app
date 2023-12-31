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

let clients = JSON.parse(localStorage.getItem("clients"));

function list_clients() {
  const tableContainer = document.getElementById("table-container");
  const table = document.createElement("table");
  table.id = "client-info";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Name", "Email", "User ID (Initial Password)", "Balance(PHP)", "Delete"].forEach(
    (headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      if (headerText ==="Name"){
        th.classList.add("name-header");
      }

      headerRow.appendChild(th);
    }
  );
  thead.appendChild(headerRow);

  const tbody = document.createElement("tbody");
  clients.forEach((client, index) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const emailCell = document.createElement("td");
    const userIdCell = document.createElement("td");
    const balanceCell = document.createElement("td");
    const deleteCell = document.createElement("td");
    nameCell.classList.add("name-cell");
    nameCell.textContent = client.name;
    emailCell.textContent = client.email;
    userIdCell.textContent = client.userId;
    balanceCell.textContent = client.balance.toFixed(2);

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash-alt";
    deleteIcon.style.cursor = "pointer";

    deleteIcon.addEventListener("click", () => {
      const confirmDelete = confirm(
        "Are you sure you want to delete this client?"
      );

      if (confirmDelete) {
        deleteClient(index);
      }
    });

    deleteCell.appendChild(deleteIcon);

    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(userIdCell);
    row.appendChild(balanceCell);
    row.appendChild(deleteCell);

    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  tableContainer.appendChild(table);
}
list_clients();

const addUserBtn = document.getElementById("add-client-btn");
addUserBtn.addEventListener("click", create_user);

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function assignUserId() {
  return 'ID' + (new Date()).getTime();
}

function formatName(name) {
  return name.toLowerCase().replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
}

function create_user() {
  const nameInput = document.getElementById("name-input").value;
  const emailInput = document.getElementById("email-input").value;
  const balanceInput = parseFloat(
    document.getElementById("balance-input").value
  );

  const capitalizedName = formatName(nameInput);

  let hasErrors = false;
  let errorMessages = [];

  if (nameInput.trim() === "") {
    errorMessages.push("Name field is empty.");
    hasErrors = true;
  } else if (/^\d/.test(nameInput)) {
    errorMessages.push("Name should not start with a number.");
    hasErrors = true;
  }

  if (emailInput.trim() === "") {
    errorMessages.push("Email field is empty.");
    hasErrors = true;
  } else if (!validateEmail(emailInput)) {
    errorMessages.push("Invalid email format.");
    hasErrors = true;
  }

  if (isNaN(balanceInput) || balanceInput < 0) {
    errorMessages.push("Invalid or negative balance.");
    hasErrors = true;
  }

  if (hasErrors) {
    const errorMessage = errorMessages.join("\n");
    alert(errorMessage);
    return;
  }

  const existingName = clients.find(
    (client) => client.name.replace(/,/g, "").toLowerCase() === capitalizedName.replace(/,/g, "").toLowerCase());
  
  if (existingName) {
    alert("User already exists.");
    return;
  }

  const existingEmail = clients.find(
    (client) => client.email === emailInput);
  
  if (existingEmail) {
    alert("Email entered is already registered to another user.");
    return;
  }

  const userId = assignUserId();
  const newClient = new Client(capitalizedName, emailInput, userId, balanceInput);
  clients.push(newClient);
  clients.sort((a, b) => a.name.localeCompare(b.name));
  localStorage.setItem("clients", JSON.stringify(clients));

  updateTable();

  document.getElementById("name-input").value = "";
  document.getElementById("email-input").value = "";
  document.getElementById("balance-input").value = "";

  alert("New client added successfully.");
}

function updateTable() {
  const table = document.getElementById("client-info");
  const tbody = table.querySelector("tbody");

  tbody.innerHTML = "";

  clients.forEach((client) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const emailCell = document.createElement("td");
    const userIdCell = document.createElement("td");
    const balanceCell = document.createElement("td");
    const deleteCell = document.createElement("td");

    nameCell.textContent = client.name;
    emailCell.textContent = client.email;
    userIdCell.textContent = client.userId;
    balanceCell.textContent = client.balance.toFixed(2);

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash-alt";
    deleteIcon.style.cursor = "pointer";

    deleteIcon.addEventListener("click", () => {
      const rowIndex = Array.from(tbody.children).indexOf(row);
      const confirmDelete = confirm(
        "Are you sure you want to delete this client?"
      );

      if (confirmDelete) {
        deleteClient(rowIndex);
      }
    });

    deleteCell.appendChild(deleteIcon);

    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(userIdCell);
    row.appendChild(balanceCell);
    row.appendChild(deleteCell);

    tbody.appendChild(row);
  });
}
function deleteClient(rowIndex) {
  clients.splice(rowIndex, 1);

  localStorage.setItem("clients", JSON.stringify(clients));

  updateTable();
}

export { clients };
