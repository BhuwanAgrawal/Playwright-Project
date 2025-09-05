const {test,expect}=require('@playwright/test')
const { lookup } = require('dns')

test('Select dropdown value',async function ({page}){
    await page.goto("https://www.zoho.com/commerce/free-demo.html")
    const dropdown=page.locator("#zcf_address_country")
    await dropdown.selectOption("Algeria")
    await expect(dropdown).toHaveValue("Algeria")
    await page.waitForTimeout(1000)
    await dropdown.selectOption("Canada")
    await expect(dropdown).toHaveValue("Canada")
    await page.waitForTimeout(1000)

    const options=await dropdown.locator("option").all()
    for(const option of options){
        const val=await option.getAttribute("value")
        console.log(val)
        await dropdown.selectOption(val)
        await page.waitForTimeout(1000)
        await expect(dropdown).toHaveValue(val)
    }   
    
})