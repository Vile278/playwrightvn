import { Page } from "@playwright/test";
import { Config } from "../Config/config";

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    get registerLink() {
        // tốt nhất:
        return this.page.getByRole('link', { name: /Register Page/ }); // lấy 1 phần text
        //return this.page.getByRole('link', { name: 'Bài học 1: Register Page (có đủ các element)' }); // lấy đúng text => dễ gây lỗi
        //tốt nhì :
        //return this.page.getByText('Bài học 1: Register Page (có đủ các element)');
        //tốt ba:
        ////return this.page.locator('a[href="01-xpath-register-page.html"]');
    }
    async gotoHome() {
        await this.page.goto(Config.baseUrl);
    }
    async clickRegisterLink() {
        await this.registerLink.click();
    }
}