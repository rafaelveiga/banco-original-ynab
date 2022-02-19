require("dotenv").config();

const fetchTransactions = require("./tasks/fetchTransactions");

async function runTasks() {
  await fetchTransactions();
}

runTasks();
