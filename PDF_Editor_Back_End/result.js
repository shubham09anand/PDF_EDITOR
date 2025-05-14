const puppeteer = require('puppeteer');

(async () => {
     const browser = await puppeteer.launch({ headless: true });
     const page = await browser.newPage();

     // 1. Open the website
     await page.goto('https://csvtu.digivarsity.online/WebApp/Result/SemesterResult.aspx?S=7%20Semester&E=Nov-Dec%202024&R=300102221060&T=Regular');

     // 2. Wait until the page is fully loaded
     await page.waitForSelector('body'); // Wait for the body to load, you can change this to a specific selector if needed

     // 3. Get the entire page content
     const pageContent = await page.content();

     // 4. Log the page content to the console
     console.log(pageContent); // This will log all the HTML of the page so you can inspect if the element with ID #loc is there

     // 5. Optionally, you can also check for the element directly
     // const element = await page.$("#loc");

     // if (element) {
     //      const resultText = await page.evaluate(el => el.innerText, element);
     //      console.log('Extracted Text from #loc ID:');
     //      console.log(resultText);
     // } else {
     //      console.log('Element with ID #loc not found.');
     // }

     await browser.close();
})();

