const { Builder, By, Key } = require('selenium-webdriver');

(async function testCalculatrice() {
    // Initialiser le driver avec les bonnes options
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // Accéder au site
        await driver.get('http://127.0.0.1:5500/CalculatriceJenkins/');

        // --- Test 1 : Vérifier l'Addition ---
        await driver.findElement(By.id('number1')).sendKeys('10');
        await driver.findElement(By.id('number2')).sendKeys('2');
        await driver.findElement(By.css('#operation')).click();                // open dropdown
        await driver.findElement(By.css('#operation option[value="add"]')).click(); // pick operateor
        await driver.findElement(By.css('#calculate')).click();  
        
        // Afficher les résultats
        let result = await driver.findElement(By.css('#result span')).getText();
        console.log(`Addition(10+2): ${result}`);
        await driver.sleep(5000);

        // --- Test 2 : Division par Zéro ---
        await driver.findElement(By.id('number2')).clear();
        await driver.findElement(By.id('number2')).sendKeys('0');
        await driver.findElement(By.css('#operation')).click();                // open dropdown
        await driver.findElement(By.css('#operation option[value="divide"]')).click(); // pick operateor
        await driver.findElement(By.css('#calculate')).click(); 

        // Afficher les résultats
        result = await driver.findElement(By.css('#result span')).getText();
        console.log(`Divide(10/0): ${result}`);
        await driver.sleep(5000);

        // --- Test 3 : Entrée Non Valide ---
        await driver.findElement(By.id('number2')).clear();
        await driver.findElement(By.id('number2')).sendKeys('abc');
        await driver.findElement(By.css('#operation')).click();                // open dropdown
        await driver.findElement(By.css('#operation option[value="multiply"]')).click(); // pick operateor
        await driver.findElement(By.css('#calculate')).click(); 

        // Afficher les résultats
        result = await driver.findElement(By.css('#result span')).getText();
        console.log(`multiply(10*abc): ${result}`);
        await driver.sleep(5000);

        // --- Test 4 : Vérifier la Soustraction ---
        await driver.findElement(By.id('number2')).clear();
        await driver.findElement(By.id('number2')).sendKeys('2');
        await driver.findElement(By.css('#operation')).click();                // open dropdown
        await driver.findElement(By.css('#operation option[value="subtract"]')).click(); // pick operateor
        await driver.findElement(By.css('#calculate')).click();
        
        // Afficher les résultats
        result = await driver.findElement(By.css('#result span')).getText();
        console.log(`Soustraction(10-2): ${result}`);
        await driver.sleep(5000);


    } finally {
        // Fermer le navigateur
        driver.quit();
    }
})();

