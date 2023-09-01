let logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", logoutUser);

function logoutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
    alert("Logged out successfully.");
}

let userDisplay = document.getElementById("greet-container");
let loggedInUser = localStorage.getItem("loggedInUser");
let clients = JSON.parse(localStorage.getItem("clients"));
let loggedClient = clients.find((client) => client.name === loggedInUser);
let balanceDisplay = document.getElementById("balance-amount");

if (!loggedClient.expenses) {
  loggedClient.expenses = [];
}

if (loggedClient) {
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

    if (item === ''){
      alert('Please enter a name or a short description for the expense.');
      return; 
    } else if (isNaN(cost)|| cost < 0){
      alert('Cost of item is invalid.');
      return;
    }

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
let withdrawBtn = document.getElementById('withdraw-btn');
let depositBtn = document.getElementById('deposit-btn');
let transferBtn = document.getElementById('transfer-btn');

withdrawBtn.addEventListener('click', withdraw);
depositBtn.addEventListener('click', deposit);
transferBtn.addEventListener('click', transfer);

function withdraw(){
 
  let withdrawModal = document.createElement('div');
  withdrawModal.setAttribute('class', 'modal');

  const closeWithdraw = document.createElement('button');
  closeWithdraw.textContent = 'X';
  closeWithdraw.classList.add('close');
  withdrawModal.appendChild(closeWithdraw);
  
  closeWithdraw.addEventListener('click', () => {
    withdrawModal.remove();
  });

  let withdrawInput = document.createElement('input');
  withdrawInput.setAttribute('type', 'number');
  withdrawInput.setAttribute('placeholder', 'Amount to withdraw');
  withdrawModal.appendChild(withdrawInput);

  let withdrawBtn = document.createElement("button");
  withdrawBtn.textContent = "WITHDRAW";
  withdrawModal.appendChild(withdrawBtn);
  document.body.appendChild(withdrawModal);

  withdrawBtn.addEventListener('click', function(){
    let withdrawAmount = parseFloat(withdrawInput.value);

    if (loggedClient.balance < withdrawAmount){
      alert('Your balance is insufficient for this transaction.');
      return;
    } else if (withdrawAmount < 0 || isNaN(withdrawAmount)){
      alert('Amount entered is invalid.');
      return;
    }

    const confirmation = confirm('Are you sure you want to withdraw ' + withdrawAmount + 'PHP ?');
    if (!confirmation) {
      return;
    }
    
    loggedClient.balance -= withdrawAmount;
    updateLocalStorage();
    displayBalance(loggedClient.balance);

    withdrawModal.remove();
  });
}

function deposit(){
 
  let depositModal = document.createElement('div');
  depositModal.setAttribute('class', 'modal');

  const closeDeposit = document.createElement('button');
  closeDeposit.textContent = 'X';
  closeDeposit.classList.add('close');
  depositModal.appendChild(closeDeposit);
  
  closeDeposit.addEventListener('click', () => {
    depositModal.remove();
  });

  let depositInput = document.createElement('input');
  depositInput.setAttribute('type', 'number');
  depositInput.setAttribute('placeholder', 'Amount to deposit');
  depositModal.appendChild(depositInput);

  let depositBtn = document.createElement("button");
  depositBtn.textContent = "DEPOSIT";
  depositModal.appendChild(depositBtn);
  document.body.appendChild(depositModal);

  depositBtn.addEventListener('click', function(){
    let depositAmount = parseFloat(depositInput.value);
    if (depositAmount < 0 || isNaN(depositAmount)){
      alert('Amount entered is invalid.');
      return;
    }
    const confirmation = confirm('Are you sure you want to deposit ' + depositAmount + 'PHP ?');
    if (!confirmation) {
      return;
    }
    
    loggedClient.balance += depositAmount;
    updateLocalStorage();
    displayBalance(loggedClient.balance);

    depositModal.remove();
  });
  
}



function transfer(){
  let transferModal = document.createElement('div');
  transferModal.setAttribute('class', 'modal');

  const closeTransfer = document.createElement('button');
  closeTransfer.textContent = 'X';
  closeTransfer.classList.add('close');
  transferModal.appendChild(closeTransfer);
  
  closeTransfer.addEventListener('click', () => {
    transferModal.remove();
  });

  let transferLabel = document.createElement('h1');
  transferLabel.textContent = "SELECT RECIPIENT:";
  transferLabel.setAttribute('id', 'transfer-label')
  transferModal.appendChild(transferLabel);

  let recipientDropdown = document.createElement('select');
  recipientDropdown.classList.add('recipient-dropdown');
  recipientDropdown.setAttribute('id','recipient-dropdown');

  clients.forEach((client) => {
    if (client.name !== loggedInUser) {
      let option = document.createElement('option');
      option.value = client.name;
      option.textContent = client.name;
      recipientDropdown.appendChild(option);
    }
  });

  let recipient = recipientDropdown.value;

  recipientDropdown.addEventListener('change', function () {
   recipient = this.value;
  });
  
  transferModal.appendChild(recipientDropdown);

  let transferInput = document.createElement('input');
  transferInput.setAttribute('type', 'number');
  transferInput.setAttribute('placeholder', 'Amount to transfer');
  transferModal.appendChild(transferInput);


  let transferBtn = document.createElement("button");
  transferBtn.textContent = "TRANSFER";
  transferModal.appendChild(transferBtn);
  document.body.appendChild(transferModal);

  transferBtn.addEventListener('click', function(){
    let transferAmount = parseFloat(transferInput.value);

    if (loggedClient.balance < transferAmount){
      alert('Your balance is insufficient for this transaction.');
      return;
    } else if (transferAmount < 0 || isNaN(transferAmount)){
      alert('Amount entered is invalid.');
      return;
    }

    const confirmation = confirm(`Are you sure you want to transfer ${transferAmount} PHP to ${recipient}?`);
    if (!confirmation) {
      return;
    }
     
  let recipientClient = clients.find((client) => client.name === recipient);
  if (recipientClient) {
    recipientClient.balance += transferAmount;
  }

    loggedClient.balance -= transferAmount;
    updateLocalStorage();
    displayBalance(loggedClient.balance);

    transferModal.remove();
  });
}
}