document.addEventListener("DOMContentLoaded", function () {
  let logoutBtn = document.getElementById("logout-btn");
  logoutBtn.addEventListener("click", logoutUser);

  function logoutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
    alert("Logout Successfully!");
  }

  let userDisplay = document.getElementById("greet-container");
  let loggedInUser = localStorage.getItem("loggedInUser");

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

    let clients = JSON.parse(localStorage.getItem("clients"));
    let loggedClient = clients.find((client) => client.name === loggedInUser);

    if (loggedClient) {
      let userBalance = loggedClient.balance.toFixed(2);
      let formatBalance = parseFloat(userBalance).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      let balanceDisplay = document.getElementById("balance-amount");
      balanceDisplay.textContent = formatBalance;
    }
  }

  let addExpenseBtn = document.getElementById('add-expense-btn');
  addExpenseBtn.addEventListener('click',addExpense);

  function addExpense() {
    let item = document.getElementById('item-input').value;
    let cost = parseFloat(document.getElementById('price-input').value);

    let tableBody = document.getElementById('expense-body');
    let newRow = tableBody.insertRow();

    let itemCell = newRow.insertCell(0);
    let costCell = newRow.insertCell(1);
    let actionCell = newRow.insertCell(2);
    itemCell.textContent = item;
    costCell.textContent = cost.toFixed(2);
    actionCell.innerHTML = '<i class="fas fa-edit edit-icon"></i> <i class="fas fa-trash delete-icon"></i>';
  }
});
