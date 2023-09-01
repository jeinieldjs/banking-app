const transactions = JSON.parse(localStorage.getItem("transactions"));
const transactionsElement = document.querySelector("#user-transactions");
const user = localStorage.getItem("loggedInUser");

const filteredTransactions = transactions.filter(
  (item) => item.user === user || item.sender === user || item.receiver === user
);

// console.log(filteredTransactions);

function renderTransactions(items) {
  transactionsElement.innerHTML = "";

  items.forEach((element) => {
    const transaction = document.createElement("div");

    const date = document.createElement("p");
    date.textContent = element.date;
    transaction.appendChild(date);

    if (element.type === "Deposit") {
      const text = document.createElement("p");
      text.textContent = `Deposited ${element.amount} PHP`;
      transaction.appendChild(text);
    }

    if (element.type === "Withdraw") {
      const text = document.createElement("p");
      text.textContent = `Withdrew ${element.amount} PHP`;
      transaction.appendChild(text);
    }

    if (element.type === "Transfer") {
      if (user === element.sender) {
        const text = document.createElement("p");
        text.textContent = `Sent ${element.amount} PHP to ${element.receiver}`;
        transaction.appendChild(text);
      } else if (user === element.receiver) {
        const text = document.createElement("p");
        text.textContent = `Received ${element.amount} PHP from ${element.sender}`;
        transaction.appendChild(text);
      }
    }

    transactionsElement.appendChild(transaction);
  });
}

sortSelector.addEventListener("change", () => {
  const selectedOption = sortSelector.value;
  let sortedTransactions = [...filteredTransactions];

  if (selectedOption === "date") {
    sortedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (selectedOption === "amount") {
    sortedTransactions.sort((a, b) => b.amount - a.amount);
  } else if (selectedOption === "type") {
    sortedTransactions.sort((a, b) => a.type.localeCompare(b.type));
  }
  // console.log(sortedTransactions);

  renderTransactions(sortedTransactions);
});

renderTransactions(filteredTransactions);
