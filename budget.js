let logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", logoutUser);

function logoutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
    alert("Logout Successfully!");
}

let userDisplay = document.getElementById("greet-container");
let loggedInUser = localStorage.getItem("loggedInUser");
let clients = JSON.parse(localStorage.getItem("clients"));
let loggedClient = clients.find((client) => client.name === loggedInUser);
let balanceDisplay = document.getElementById("balance-amount");

if (!loggedClient.expenses) {
  loggedClient.expenses = [];
}

if (loggedInUser) {
  let greet = document.createElement("h1");
  greet.innerHTML = `WELCOME, <span id="usernameSpan">${loggedInUser}</span>!`;
  userDisplay.appendChild(greet);

  let usernameSpan = document.getElementById("usernameSpan");
  usernameSpan.style.color = "#68A225";

  let dateContainer = document.createElement("div");
  dateContainer.setAttribute("class", "dash-containers");
  userDisplay.appendChild(dateContainer);

  function updateDateTime() {
    let currentTime = new Date();
    dateContainer.textContent = `${currentTime.toDateString()} | ${currentTime.toLocaleTimeString()}`;
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);

    let expenses = loggedClient.expenses || [];

  displayExpenses(expenses);
  displayBalance(loggedClient.balance);

  let addExpenseBtn = document.getElementById('add-expense-btn');
  addExpenseBtn.addEventListener('click',addExpense);

  function addExpense() {
    let item = document.getElementById('item-input').value.toUpperCase();
    let cost = parseFloat(document.getElementById('price-input').value);
    let timestamp = new Date().toLocaleString();

    let newExpense = {
      item: item,
      cost: cost,
      timestamp: timestamp
    };

    expenses.push(newExpense);
    loggedClient.expenses = expenses;
    loggedClient.balance -= cost;
    updateLocalStorage();

    document.getElementById('item-input').value = '';
    document.getElementById('price-input').value = '';

    displayExpenses(expenses);
    displayBalance(loggedClient.balance);
  }

  function updateLocalStorage() {
    let clientIndex = clients.findIndex(client => client.name === loggedInUser);
    if (clientIndex !== -1) {
      clients[clientIndex] = loggedClient;
      localStorage.setItem("clients", JSON.stringify(clients));
    }
  }

  function displayExpenses(expenses) {
    let tableBody = document.getElementById('expense-body');
    tableBody.innerHTML = ''; 

    expenses.forEach((expense,index) => {
      let newRow = tableBody.insertRow();
      newRow.insertCell(0).textContent = expense.item;
      newRow.insertCell(1).textContent = expense.cost.toFixed(2);
      newRow.insertCell(2).textContent = expense.timestamp;
      newRow.insertCell(3).innerHTML = '<i class="fas fa-trash delete-icon"></i>';

      let deleteIcon = newRow.querySelector('.delete-icon');
      deleteIcon.addEventListener('click', () => deleteExpense(expense, index));
    });
  }

  function displayBalance(balance) {
    let formattedBalance = parseFloat(balance).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  balanceDisplay.textContent = formattedBalance;

    if (balance < 0){
        balanceDisplay.style.color = 'red';
      } else {
        balanceDisplay.style.color = 'white';
      }
    }

  function deleteExpense(expense, index) {
    const confirmed = confirm('Are you sure you want to delete this expense?');
    if (confirmed){
      loggedClient.balance += expense.cost;
      loggedClient.expenses.splice(index, 1);
      updateLocalStorage();
      displayExpenses(loggedClient.expenses);
      displayBalance(loggedClient.balance);
    }
  }
}
