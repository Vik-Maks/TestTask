import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import validCredentials from "../fixtures/valid-users-data.json";
import invalidCredentials from "../fixtures/invalid-users-data.json";

test.use({ trace: "on" });

test.describe("POSITIVE TESTS", () => {
    test("Successful login", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const [email, password] = validCredentials;

        await page.goto("https://magnetgoal.com/login");
        await loginPage.login(email, password);

        await expect(page).toHaveTitle(/Home/);
    });
});
test.describe("NEGATIVE TESTS", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://magnetgoal.com/login");
    });
    test("Empty fields", async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login(" ", " ");
        await loginPage.checkErrorPopUp();

        await expect(page).toHaveURL(/login/);
    });
    test("Login field is empty", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const [_, password] = validCredentials;

        await loginPage.login("", password);
        await loginPage.checkErrorPopUp();

        await expect(page).toHaveURL(/login/);
    });
    test("Password field is empty", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const [email, _] = validCredentials;

        await loginPage.login(email, " ");
        await loginPage.checkErrorPopUp();

        await expect(page).toHaveURL(/login/);
    });

    for (const [email, password] of invalidCredentials) {
        test(`Login test for ${email}`, async ({ page }) => {
            const loginPage = new LoginPage(page);

            await loginPage.login(email, password);
            await loginPage.checkErrorPopUp();

            await expect(page).toHaveURL(/login/);
        });
    }
});
