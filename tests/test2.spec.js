const {test, expect} = require('@playwright/test');


test('verfiy cart functionality', async ({page}) => {

    await page.goto('https://practice.expandtesting.com/bookstore')

    await expect (page).toHaveURL('https://practice.expandtesting.com/bookstore')

    await page.locator("//input[@name='search']").fill("Agile")
    await page.locator("//button[text()='Search']").click()


    await expect (page).toHaveURL('https://practice.expandtesting.com/bookstore?search=Agile')

    //await page.locator("//h5[text()='Agile Testing']").tobevisible()

    //expect(await page.locator("//span[@class='badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill']").textContent()).toBe("·························")

    await page.locator("//a[@alt='Agile Testing']").click()
    expect(await page.locator("//span[@class='badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill']").textContent()).toContain("1")
    await page.locator("//img[@alt='Cart']").click()
    await expect (page).toHaveURL('https://practice.expandtesting.com/bookstore/cart')

    await expect(page.locator("//td[@class='information'][2]").textContent()).toContain("Agile")
    await expect(page.locator("//input[@id='cartQty']").inputValue()).toBe("1")
    await page.waitForTimeout(3000)
})

