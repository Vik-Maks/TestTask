import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly loginInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorPopUp: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginInput = page.locator("#username0");
        this.passwordInput = page.locator("#passwordField1");
        this.loginButton = page.locator("text='Login'").nth(2);
        this.errorPopUp = page.locator(".p-toast-message-content");
    }

    async login(username: string, password: string) {
        await expect(this.loginInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();

        await this.loginInput.type(username);
        await this.passwordInput.type(password);

        await expect(this.loginButton).toBeVisible();
        await this.loginButton.click();
    }

    async checkErrorPopUp() {
        await expect(this.errorPopUp).toBeVisible();
    }
}
