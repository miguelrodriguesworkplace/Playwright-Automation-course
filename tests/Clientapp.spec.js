const {test, expect} = require('@playwright/test');


test.only('Browser Context -Validating Error login', async({page}) =>
    {
        const userEmail = page.locator("#userEmail");
        const userPassword = page.locator("#userPassword");
        const logIn = page.locator("#login");
        const addtoCart =  await page.locator('[class="btn w-10 rounded"]');
        const myCart = await page.locator('[routerlink="/dashboard/cart"]');
        const checkOut = await page.locator('.totalRow button');
        
        await page.goto('https://rahulshettyacademy.com/client');
        await userEmail.fill("anshika@gmail.com");
        await userPassword.fill("Iamking@000");
        await logIn.click();
        
        expect(await page.locator('[id="toast-container"]')).toHaveText('Login Successfully');
        await page.waitForLoadState('networkidle');
        const titles = await page.locator(".card-body b").allTextContents();
        console.log(titles);
                
        await addtoCart.first().click();
        expect(await page.locator('[role="alert"]')).toHaveText('Product Added To Cart');
        expect(await myCart.locator('label')).toHaveText('1');
        await myCart.click();
        expect(await page.locator('[class="heading cf"] h1')).toHaveText('My Cart');
        await checkOut.click();
        
        expect(await  page.locator('[class="payment__title"]').getByText('Payment Method')).toBeVisible();
        expect(await page.locator('[class="details__user"] input[type="text"]')).toHaveValue("anshika@gmail.com");
        


        await page.getByPlaceholder("Select Country").pressSequentially('India');
        const listItems = page.locator('.ta-results button');
        const item = listItems.filter({hasText: new RegExp ('India$')});
        await item.click();

        await page.locator('[class="actions"] a').click();
        expect(await page.locator('[id="toast-container"]')).toHaveText('Order Placed Successfully');
        expect(await page.locator('[class="hero-primary"]')).toHaveText(' Thankyou for the order.')

    





    })