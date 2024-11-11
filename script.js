const balanceAmount = document.getElementById("balance-amount");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const transactionsList = document.getElementById("transactions-list");
const form = document.getElementById("form");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");

let transactions = [];

// Function to generate a unique ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add a new transaction
function addTransaction(e) {
  e.preventDefault();

  const text = textInput.value.trim();
  const amount = +amountInput.value.trim();

  if (text === "" || isNaN(amount) || amount === 0) {
    alert("Please enter a valid text and amount");
    return;
  }

  const transaction = {
    id: generateID(),
    text,
    amount,
  };

  transactions.push(transaction);
  updateUI();
  textInput.value = "";
  amountInput.value = "";
}

// Remove a transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateUI();
}

// Update the UI with balance, income, expense, and transaction history
function updateUI() {
  // Calculate balance, income, and expense
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);
  const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  // Update the DOM
  balanceAmount.textContent = `$${total}`;
  moneyPlus.textContent = `+$${income}`;
  moneyMinus.textContent = `-$${Math.abs(expense)}`;

  // Render transactions
  transactionsList.innerHTML = "";
  transactions.forEach((transaction) => {
    const li = document.createElement("li");
    li.classList.add(
      "transaction",
      transaction.amount > 0 ? "income" : "expense"
    );
    li.innerHTML = `
            ${transaction.text} <span>${
      transaction.amount > 0 ? "+" : "-"
    }$${Math.abs(transaction.amount)}</span>
            <button class="delete-btn" onclick="removeTransaction(${
              transaction.id
            })">x</button>
        `;
    transactionsList.appendChild(li);
  });
}

// Event Listener
form.addEventListener("submit", addTransaction);

// Initial call to update UI
updateUI();
