const transactionsElement = document.querySelector(".transactions");
const transactions = JSON.parse(localStorage.getItem("transactions"));
const sortSelector = document.getElementById("sortSelector");

// console.log(transactions);

function renderTransactions(transactions) {
  transactionsElement.innerHTML = "";

  transactions.forEach((transaction) => {
    const transactionElement = document.createElement("div");

    const typeElement = document.createElement("h3");
    typeElement.textContent = transaction.type;
    transactionElement.appendChild(typeElement);

    const dateElement = document.createElement("p");
    dateElement.textContent = `Date: ${transaction.date}`;
    transactionElement.appendChild(dateElement);

    if (transaction.user) {
      const userElement = document.createElement("p");
      userElement.textContent = `User: ${transaction.user}`;
      transactionElement.appendChild(userElement);
    }

    if (transaction.sender) {
      const senderElement = document.createElement("p");
      senderElement.textContent = `Sender: ${transaction.sender}`;
      transactionElement.appendChild(senderElement);
    }

    if (transaction.receiver) {
      const receiverElement = document.createElement("p");
      receiverElement.textContent = `Receiver: ${transaction.receiver}`;
      transactionElement.appendChild(receiverElement);
    }

    const amountElement = document.createElement("p");
    amountElement.textContent = `Amount: ${transaction.amount} PHP`;
    transactionElement.appendChild(amountElement);

    transactionsElement.appendChild(transactionElement);
  });
}

sortSelector.addEventListener("change", () => {
  const selectedOption = sortSelector.value;
  let sortedTransactions = [...transactions];

  if (selectedOption === "date") {
    sortedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (selectedOption === "amount") {
    sortedTransactions.sort((a, b) => b.amount - a.amount);
  } else if (selectedOption === "type") {
    sortedTransactions.sort((a, b) => a.type.localeCompare(b.type));
  }

  renderTransactions(sortedTransactions);
});

renderTransactions(transactions);
