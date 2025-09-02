const {test,expect}=require('@playwright/test')

test("First Case", async function({page})
{
    expect(12).toBe(12)

})

test("Second Case", async function({page})
{
    expect(100).toBe(102)

})

test("Third Case", async function({page})
{
    expect(2.0).toBe(2.0)

})