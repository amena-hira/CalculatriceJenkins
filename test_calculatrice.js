const { Builder, By, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async function testCalculatrice() {
  const options = new chrome.Options()
    .addArguments("--headless")
    .addArguments("--no-sandbox")
    .addArguments("--disable-dev-shm-usage");
  // Initialiser le driver avec les bonnes options
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    // Accéder au site
    await driver.get("http://localhost:8080/index.html");

    async function selectOp(operator) {
      await driver.findElement(By.css("#operation")).click(); // open dropdown
      await driver
        .findElement(By.css(`#operation option[value="${operator}"]`))
        .click(); // pick operateor
    }

    // --- Test 1 : Vérifier l'Addition ---
    await driver.findElement(By.id("number1")).sendKeys("10");
    await driver.findElement(By.id("number2")).sendKeys("2");
    await selectOp("add");
    await driver.findElement(By.css("#calculate")).click();

    // Afficher les résultats
    let result = await driver.findElement(By.css("#result span")).getText();
    console.log(`Addition(10+2): ${result}`);
    await driver.sleep(5000);

    // --- Test 2 : Division par Zéro ---
    await driver.findElement(By.id("number2")).clear();
    await driver.findElement(By.id("number2")).sendKeys("0");
    await selectOp("divide");
    await driver.findElement(By.css("#calculate")).click();

    // Afficher les résultats
    result = await driver.findElement(By.css("#result span")).getText();
    console.log(`Divide(10/0): ${result}`);
    await driver.sleep(5000);

    // --- Test 3 : Entrée Non Valide ---
    await driver.findElement(By.id("number2")).clear();
    await driver.findElement(By.id("number2")).sendKeys("abc");
    await selectOp("multiply");
    await driver.findElement(By.css("#calculate")).click();

    // Afficher les résultats
    result = await driver.findElement(By.css("#result span")).getText();
    console.log(`multiply(10*abc): ${result}`);
    await driver.sleep(5000);

    // --- Test 4 : Vérifier la Soustraction ---
    await driver.findElement(By.id("number2")).clear();
    await driver.findElement(By.id("number2")).sendKeys("2");
    await selectOp("subtract");
    await driver.findElement(By.css("#calculate")).click();

    // Afficher les résultats
    result = await driver.findElement(By.css("#result span")).getText();
    console.log(`Soustraction(10-2): ${result}`);
    await driver.sleep(5000);
  } finally {
    // Fermer le navigateur
    driver.quit();
  }
})();
