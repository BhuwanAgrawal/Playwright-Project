const { test, expect } = require('@playwright/test')
const path = require('path')

test.describe('File Upload Component', () => {
  test("file upload", async function({ page }) {
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php')
    // Upload file
    // Ensure the file exists at this path or update the path to a valid file
    const filePath = path.join('screenshot', 'Login.png')
    await page.locator("//input[@id='filesToUpload']").setInputFiles(filePath)
    await page.waitForTimeout(3000)
    // Assertion
    await expect(page.locator("//li[text()='No Files Selected']")).not.toBeVisible()
       
  })
})


