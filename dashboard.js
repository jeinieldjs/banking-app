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
  new Client("Anna Medina", "annamedina@gmail.com", 102893, 5000),
  new Client("Bruno Cruz", "brunocruz@yahooo.com", 182203, 250000),
  new Client("Chay Pena", "chaypena27@gmail.com", 960405, 300),
  new Client("Dexter Lim", "dexlim@yahoo.com", 290917, 39000),
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
    greet.innerHTML = `Welcome, <span id="usernameSpan">${loggedInUser}</span>!`;
    adminDisplay.appendChild(greet);

    let usernameSpan = document.getElementById("usernameSpan");
    usernameSpan.style.color = "#68A225";

    let dateContainer = document.createElement("div");
    dateContainer.setAttribute("id", "date-container");
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
