const{test,expect} =require('@playwright/test')
const TestData=require('../testData/testdata.json')

test("test data vaerification", async ({ page }) => {

	for (const testdata of TestData) {

		const username = testdata.username;
		const password = testdata.password;
		const url = testdata.url;

		// You can use username, password, and url here
	}
});