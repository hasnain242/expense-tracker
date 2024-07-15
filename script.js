const balance = document.getElementById("balance");
const moneycredit = document.getElementById("money-credit");
const moneydebit = document.getElementById("money-debit");
const list = document.getElementById("list");
const form = document.getElementById("add-form");
const reason = document.getElementById("reason");
const amount = document.getElementById("amount");
const btn=document.getElementById('btn')
const Transactions = [
//   { id: 1, reason: "salary", amount: +5000 },
//   { id: 2, reason: "diner", amount: -20 },
//   { id: 3, reason: "lunch", amount: -50 },
//   { id: 4, reason: "pocket", amount: -100 },
//   { id: 5, reason: "breakfast", amount: -10 },
];
let transactions = JSON.parse(localStorage.getItem('transaction'));

function displaytransaction(transaction) {
  const type = transaction.amount > 0 ? "+" : "-";
  const transactionli = document.createElement("li");
  transactionli.classList.add(transaction.amount > 0 ? "credit" : "debit");
  transactionli.innerHTML = `
  ${transaction.reason} <span> ${transaction.amount}</span> 
  <button class="delete-btn" onclick="deletetransaction(${transaction.id})">x</button>
  `;
  list.appendChild(transactionli);
  
}
function updatebalance() {
  const transactionamounts = transactions.map(
    (transaction) => transaction.amount
  );
  const totalbalance = transactionamounts.reduce(
    (acc, amount) => (acc += amount),
    0
  );
  const creditbalance = transactionamounts
    .filter((amount) => amount > 0)
    .reduce((acc, amount) => (acc += amount), 0);
  const debitbalance = transactionamounts
    .filter((amount) => amount < 0)
    .reduce((acc, amount) => (acc += amount), 0);
  balance.innerText = `$${totalbalance}`;
  moneycredit.innerText = `$${creditbalance}`;
  moneydebit.innerText = `$${debitbalance}`;
}
function createid() {
  return Math.floor(Math.random() * 1000000);
}
function addtransaction(e) {
  e.preventDefault();
  if (reason.value === "" || amount.value === "") {
    alert("please provide a valid reason and transaction amount");
  } else {
    const transaction = {
      id: createid(),
      reason: reason.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    localStorage.setItem('transaction',JSON.stringify(transactions))
    displaytransaction(transaction);
    updatebalance();
    reason.value=''
    amount.value=''
    
  }
}
function deletetransaction(id){
      transactions=transactions.filter(transaction=>transaction.id!==id);
      localStorage.setItem('transaction',JSON.stringify(transactions))

      init();
}
function init() {
  list.innerHTML = "";
  transactions.forEach(displaytransaction);
  updatebalance();
}

form.addEventListener("submit", addtransaction);

init();
