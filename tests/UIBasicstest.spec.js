const {test, expect} = require('@playwright/test');


test('Browser Context Page Playwright test', async({browser}) =>
    {
        
        const context = await browser.newContext();
        const page = await context.newPage();
        const userName = page.locator('[id="username"]')
        const signIn = page.locator("#signInBtn");
        const cardTitles = page.locator(".card-body a");
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title());
        // CSS , XPath
        await userName.fill("rahulshetty");
        await page.locator('#password').fill("learning");
        await signIn.click();
        
        console.log(await page.locator("[style*='block']").textContent());
        await expect(page.locator("[style*='block']")).toContainText('Incorrect');
        await userName.fill("");
        await userName.fill("rahulshettyacademy");
        await signIn.click();

        //race condition
        await Promise.all([
            page.waitForNavigation(),
            signIn.click(),
        ]);

        console.log(await cardTitles.first().textContent());
        console.log(await cardTitles.nth(1).textContent());
        const allTitles = await cardTitles.allTextContents();
        console.log(allTitles);

    })

    test('UI controls', async({page}) =>
    {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const userName = page.locator('[id="username"]')
        const signIn = page.locator("#signInBtn");
        const documentLink = page.locator("[href*='documents-request']");
        const dropdown =  page.locator("select.form-control")
        await dropdown.selectOption("consult");
        await page.locator(".radiotextsty").last().click();
        await page.locator("#okayBtn").click();
        
        //assertion
        expect(page.locator(".radiotextsty").last()).toBeChecked();
        await page.locator("#terms").click();
        expect (page.locator("#terms")).toBeChecked();
        await page.locator("#terms").uncheck();
        expect(await page.locator("#terms").isChecked()).toBeFalsy();
        await expect(documentLink).toHaveAttribute("class","blinkingText");

    })

    test('@Child windows hadl', async({browser}) =>
    {
        const context = await browser.newContext();
        const page = await context.newPage();
        const userName = page.locator('[id="username"]');
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const documentLink = page.locator("[href*='documents-request']");
        
        const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click(),
        ])
        const text = await newPage.locator(".red").textContent();
        const arrayText = text.split("@");
        const domain = arrayText[1].split(" ")[0];
        console.log(domain);
        await page.locator("#username").fill(domain);
        console.log(await page.locator("#username").textContent());
        

    })