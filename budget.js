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

  let loggedClient = clients.find((client) => client.name === loggedInUser);
  let balanceDisplay = document.getElementById("balance-amount");

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

 

    if (loggedClient) {
      let userBalance = loggedClient.balance.toFixed(2);
      let formatBalance = parseFloat(userBalance).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      balanceDisplay.textContent = formatBalance;
    }
  }

  let addExpenseBtn = document.getElementById('add-expense-btn');
  addExpenseBtn.addEventListener('click',addExpense);

  function addExpense() {
    let item = document.getElementById('item-input').value;
    let cost = parseFloat(document.getElementById('price-input').value);
    let timestamp = new Date().toLocaleString();

    let tableBody = document.getElementById('expense-body');
    let newRow = tableBody.insertRow();

    let itemCell = newRow.insertCell(0);
    let costCell = newRow.insertCell(1);
    let timeCell = newRow.insertCell(2);
    let deleteCell = newRow.insertCell(3);
    
    itemCell.textContent = item;
    costCell.textContent = cost.toFixed(2);
    deleteCell.innerHTML = '<i class="fas fa-trash delete-icon"></i>';
    timeCell.textContent = timestamp;

    loggedClient.balance -= cost;
    let updatedBalance = loggedClient.balance.toFixed(2);
    let formattedBalance = parseFloat(updatedBalance).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    balanceDisplay.textContent = formattedBalance; 

    if (loggedClient.balance < 0){
      balanceDisplay.style.color = 'red';
    }
  }

  let deleteExp = document.querySelector('.delete-icon');
  deleteExp.addEventListener('click', deleteExpense);

function deleteExpense(){
  const confirmed = confirm('Are you sure you want to remove this expense item?');
  if (confirmed){
    tableBody.removeChild(newRow);
    loggedClient.balance += cost;
  }
}
});

//expenses can be added na, pero di pa nauupdate sa local storage yung balance and expenses ni client
