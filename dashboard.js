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

let initialClients = [
  new Client("Ayala, Marissa Yap", "mayala@yahoo.com", "ID1692264379273", 85000),
  new Client("Cruz, Bruno Solano", "brunocruz@yahoo.com", "ID1679072730309", 250000),
  new Client("Felipe, Edward Daez", "edfelipe@yahoo.com", "	ID1692264905895", 85000),
  new Client("Lim, Dexter Go", "dexlim@yahoo.com", "ID1686585600062", 39000),
  new Client("Maranan, Pedro Reyes", "pedreymaranan@gmail.com", "ID1692264222480", 15000),
  new Client("Medina, Anna Perez", "annamedina@gmail.com", "ID1692258955919", 5000),
  new Client("Pena, Chay Marquez", "chaypena27@gmail.com", "ID1583371815753", 300)
  
];

let clients = localStorage.getItem("clients")
  ? JSON.parse(localStorage.getItem("clients"))
  : initialClients;

localStorage.setItem("clients", JSON.stringify(clients));

document.addEventListener("DOMContentLoaded", function () {
  let adminDisplay = document.getElementById("admin-dash");
  let loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
    let greet = document.createElement("h1");
    greet.innerHTML = `WELCOME, <span id="usernameSpan">${loggedInUser}</span>!`;
    adminDisplay.appendChild(greet);

    let usernameSpan = document.getElementById("usernameSpan");
    usernameSpan.style.color = "#68A225";

    let dateContainer = document.createElement("div");
    /*dateContainer.setAttribute("id", "date-container");*/
    dateContainer.setAttribute("class", "dash-containers");
    adminDisplay.appendChild(dateContainer);

    function updateDateTime() {
      let currentTime = new Date();
      dateContainer.textContent = `${currentTime.toDateString()} | ${currentTime.toLocaleTimeString()}`;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

    let todoContainer = document.createElement("div");
    todoContainer.setAttribute("id", "todo-container");
    adminDisplay.appendChild(todoContainer);

    let taskInput = document.createElement("input");
    taskInput.setAttribute("type", "text");
    taskInput.setAttribute("id", "task-input");
    taskInput.setAttribute("placeholder", "TODAY'S TASKS");
    todoContainer.appendChild(taskInput);

    let taskList = document.createElement("ul");
    todoContainer.appendChild(taskList);

    taskInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && taskInput.value.trim() !== "") {
        addNewToDoItem(taskInput.value, false);
        taskInput.value = "";
        saveToDoItems();
      }
    });

    function saveToDoItems() {
      let items = [];
      let listItems = taskList.querySelectorAll(".list-item");
      listItems.forEach(function (listItem) {
        let text = listItem.innerText;
        let isDone = listItem.classList.contains("done");
        items.push({ TEXT: text, DONE: isDone });
      });

      localStorage.setItem("toDoItems", JSON.stringify(items));
    }

    function addNewToDoItem(text, isDone) {
      let listItem = document.createElement("li");
      listItem.classList.add("list-item");
      listItem.innerText = text;
      if (isDone) {
        listItem.classList.add("done");
      }

      listItem.addEventListener("click", function () {
        listItem.classList.toggle("done");
        saveToDoItems();
      });

      listItem.addEventListener("dblclick", function () {
        taskList.removeChild(listItem);
        saveToDoItems();
      });

      taskList.appendChild(listItem);
    }

    function loadToDoItems() {
      let storedItems = JSON.parse(localStorage.getItem("toDoItems"));
      if (storedItems) {
        storedItems.forEach(function (item) {
          addNewToDoItem(item.TEXT, item.DONE);
        });
      }
    }

    loadToDoItems();
  }
});

const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

let daysRemaining;

/*if (currentMonth === 1) { //kung feb
  if (currentDay === 15) { 
    daysRemaining = 0;
  } else if (currentDay < 15){
    daysRemaining = 15 - currentDay;
  } else if ((currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0) { //kung leap year
    daysRemaining = currentDay <= 29 && currentDay > 15 ? 29 - currentDay : 30 + (29 - currentDay);
  } else { //kung di leap year
    daysRemaining = currentDay <= 28 && currentDay > 15 ? 28 - currentDay : 30 + (28 - currentDay);
  } 
} else if (currentMonth === 3 || currentMonth === 5 || currentMonth === 8 || currentMonth === 10) { //para sa 30 days
  if (currentDay === 15||currentDay === 30) {
    daysRemaining = 0;
  } else if (currentDay < 15) {
    daysRemaining = 15 - currentDay;
  } else if (currentDay > 15){
    daysRemaining = 30 - currentDay;
  }
} else if (currentDay === 15||currentDay === 30) { //para sa 31 days ---> must be separated kasi nagnenegative if hindi
  daysRemaining = 0;
} else if (currentDay < 15) {
  daysRemaining = 15 - currentDay;
} else if (currentDay > 15 && currentDay < 30){
  daysRemaining = 30 - currentDay
} else if (currentDay === 31){
  daysRemaining = 31 - currentDay + 15;
}*/

if (currentDay === 15|| currentDay === 30){
  daysRemaining = 0;
} else if ([0,2,4,6,7,9,11].includes(currentMonth)){
  if (currentDay < 15){
    daysRemaining = 15 - currentDay;
  } else if (currentDay > 15 && currentDay < 30){
    daysRemaining = 30 - currentDay;
  } else if (currentDay === 31){
    daysRemaining = 31 - currentDay + 15;
  }
} else if (currentMonth === 1){
  if (currentDay < 15){
    daysRemaining = 15 - currentDay;
  } else if ((currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0) { 
    daysRemaining = currentDay <= 29 && currentDay > 15 ? 29 - currentDay : 30 + (29 - currentDay);
  } else {
    daysRemaining = currentDay <= 28 && currentDay > 15 ? 28 - currentDay : 30 + (28 - currentDay);
  } 
} else if ([3,5,8,10].includes(currentMonth)) {
  if (currentDay < 15) {
    daysRemaining = 15 - currentDay;
  } else if (currentDay > 15){
    daysRemaining = 30 - currentDay;
  }
}

const countdownDisplay = document.createElement("div");
countdownDisplay.setAttribute("id", "countdown-container");

const countdownText = document.createElement("div");
countdownText.textContent = "Days 'til payday:";
countdownText.setAttribute("id", "countdown-text");
countdownDisplay.appendChild(countdownText);

const countdownNumber = document.createElement("div");
countdownNumber.textContent = daysRemaining;
countdownNumber.setAttribute("id", "countdown-number");
countdownDisplay.appendChild(countdownNumber);

const countdownMessage = document.createElement("div");
countdownMessage.setAttribute("id", "countdown-message");

if (daysRemaining === 0) {
  countdownMessage.textContent = "Today is the day!🎉";
} else if (daysRemaining === 1) {
  countdownMessage.textContent = "Sooo close!";
} else {
  countdownMessage.textContent = "Hang in there!";
}

countdownDisplay.appendChild(countdownMessage);
let adminDisplay = document.getElementById("admin-dash");
adminDisplay.appendChild(countdownDisplay);
;