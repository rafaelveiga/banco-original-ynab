const mapPasswordKeys = async (page) => {
  let keys = await page.$$(".keyboard ul li");
  let keyMapped = {};

  for (const key of keys) {
    let text = await page.evaluate((element) => element.textContent, key);
    if (text.includes("ou")) {
      let digits = text.split("ou").map((digit) => digit.trim());
      keyMapped[digits[0]] = key;
      keyMapped[digits[1]] = key;
    }
  }

  return keyMapped;
};

module.exports = mapPasswordKeys;
