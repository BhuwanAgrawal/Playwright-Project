const { test, expect } = require('@playwright/test');

test.describe('Handle Alerts', () => {
  test('should handle a simple alert', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('I am a JS Alert');
      await dialog.accept();
    });
    await page.locator("//button[text()='Click for JS Alert']").click();
    const resultText = await page.locator('#result').textContent();
    expect(resultText).toBe('You successfully clicked an alert');
  });

  test('should handle a confirmation dialog', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe('I am a JS Confirm');
        await dialog.dismiss();
    });
    await page.locator("//button[text()='Click for JS Confirm']").click();
    const resultText = await page.locator('#result').textContent();
    expect(resultText).toBe('You clicked: Cancel');
  });

  test('should handle a prompt dialog', async ({ page }) => {   
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('prompt');
      expect(dialog.message()).toBe('I am a JS prompt');
      await dialog.accept('Playwright User');
    });
    await page.locator("//button[text()='Click for JS Prompt']").click();
    const resultText = await page.locator('#result').textContent();
    expect(resultText).toBe('You entered: Playwright User');
  }
    );
    test('should handle a prompt dialog with empty input', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
        page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('prompt');
            expect(dialog.message()).toBe('I am a JS prompt');
            await dialog.accept('');
        });
        await page.locator("//button[text()='Click for JS Prompt']").click();
        const resultText = await page.locator('#result').textContent();
        expect(resultText).toBe('You entered: ');
    }
    );
    test('should handle a prompt dialog with cancel', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');  
        page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('prompt');
            expect(dialog.message()).toBe('I am a JS prompt');
            await dialog.dismiss();
        }
        );
        await page.locator("//button[text()='Click for JS Prompt']").click();
        const resultText = await page.locator('#result').textContent();
        expect(resultText).toBe('You entered: null');
    }
    );
}); 