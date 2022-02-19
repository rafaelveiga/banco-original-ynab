const puppeteer = require("puppeteer");
const mapPasswordKeys = require("../utils/mapPasswordKeys");

async function fetchTransactions() {
  console.log(">> Fetching transactions...");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setRequestInterception(true);

  page.on("request", (request) => {
    request.continue();
  });

  page.on("requestfinished", (request) => {
    if (request.url().includes("/account/transactionsHist")) {
      console.log(request);
    }
  });

  // navigate
  // ==============================
  console.log("> Navigating to the page...");
  await page.goto("https://meu.original.com.br");
  await page.waitForNetworkIdle();

  // login
  // ==============================
  console.log("> Logging in...");
  await page.type("#cpf", process.env.ACCOUNT_CPF);

  // fill password
  // ===============================
  let passwordKeys = await mapPasswordKeys(page);
  console.log("> Filling password");
  console.log(process.env.ACCOUNT_PWD);
  console.log(passwordKeys);
  for (const digit of process.env.ACCOUNT_PWD) {
    await passwordKeys[digit].click({ delay: 300 });
  }
  console.log("> Password has been filled");

  // submit
  // ==============================
  page.click("#loggin", { delay: 300 });

  // wait for page load
  // ==============================
  await page.waitForNetworkIdle();

  // Navigate to debit transactions
  // ==============================
  const [debitButton] = await page.$x(
    "//span[contains(., 'Extrato da conta')]"
  );
  if (debitButton) {
    await debitButton.click({ delay: 300 });
  }

  console.log("pageloaded");
}

module.exports = fetchTransactions;
