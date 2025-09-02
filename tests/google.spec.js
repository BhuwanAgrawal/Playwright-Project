const {test,expect}=require('@playwright/test')

test("google Case", async function({page})
{
    await page.goto("https://google.com")

    const url = await page.url()

    console.log("URL is " + url)
    const title = await page.title()

    console.log("Title is " + title)

    expect(title).toEqual("Google")
    await expect(page).toHaveTitle("Yahoo")

})