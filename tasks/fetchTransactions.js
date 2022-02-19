const puppeteer = require("puppeteer");

async function fetchTransactions() {
  console.log(">> Fetching transactions...");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // navigate
  // ==============================
  console.log("> Navigating to the page...");
  await page.goto("https://meu.original.com.br");
  await page.waitForNetworkIdle();

  // login
  // ==============================
  console.log("> Logging in...");
  await page.type("#cpf", process.env.ACCOUNT_CPF);
}

module.exports = fetchTransactions;
