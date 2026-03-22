import { test, expect, Page } from "@playwright/test";
import {RegisterAction} from "../actions/register.action";
import { RegisterPage } from "../pages/register.page";
import  inputData  from "../data/inputData.json";
// I. Khai báo biến dùng chung trong các test cases
let registerAction: RegisterAction;
let registerPage: RegisterPage;

// II. hook beforeEach để mở trang register trước khi thực hiện các test case, tránh việc phải gọi hàm gotoRegisterPage() trong từng test case, giúp code ngắn gọn hơn và dễ bảo trì hơn    
test.beforeEach(async ({ page }) => {
    registerAction = new RegisterAction(page);
    registerPage = new RegisterPage(page);
    await registerAction.gotoRegisterPage();
});

//III. Test cases:

test('TC1: submit form ', async ({ page }) => {
    // const registerAction = new RegisterAction(page);
    // await registerAction.gotoRegisterPage();
    // Cách 1: data driven test: dùng vòng for để test tất cả các record trong file inputData.json: 
    for (const record of inputData) {
        await registerAction.submitForm(record);
        await registerAction.verifyRecordAdded(record);
    }
    // Cách 2: là cách cũ, để vòng for đọc data trong action, vi phạm data driven test:
    //await registerAction.CheckElements();
    //await page.pause();
});

test ('TC2: check radio buttons Male and Female', async ({ page }) => { 
    // const registerAction = new RegisterAction(page);
    // const registerPage = new RegisterPage(page);
    // await registerAction.gotoRegisterPage();
    await registerPage.checkRadioMale();
    //Verify radio Male đã được chọn and Female chưa được chọn  
    await expect(registerPage.radioMale).toBeChecked();
    await expect(registerPage.radioFemale).not.toBeChecked();
    await registerPage.checkRadioFemale();
    //Verify radio Female đã được chọn and Male chưa được chọn
    await expect(registerPage.radioFemale).toBeChecked();
    await expect(registerPage.radioMale).not.toBeChecked();
    //await page.pause();
});
test ('TC3: check tooltip text', async ({ page }) => {
    // const registerAction = new RegisterAction(page);
    // const registerPage = new RegisterPage(page);    
    // await registerAction.gotoRegisterPage();
    await registerPage.hoverTooltip();
    //Verify tooltip text hiển thị đúng
    await expect(registerPage.tooltip).toContainText('Subscribe to our newsletter for updates');
    //await page.pause();
});
test ('TC 4: check common elements on the Register page', async ({ page }) => {
    // Verfy Register button is visible and enabled
    await expect(registerPage.registerButton).toBeVisible();
    await expect(registerPage.registerButton).toBeEnabled();
    //verify username input field is visible and enabled
    await expect(registerPage.textNameId).toBeVisible();
    await expect(registerPage.textNameId).toBeEnabled();
    //verify email input field is visible and enabled});
});

test ('TC 5: check date of birth dropdown', async ({ page }) => {
   let dateOfBirth = '2000-01-15';
    //await registerPage.selectDay.click(); // click vào dropdown để mở danh sách các options: chỉ có thể với custom datetime picker
    //await page.pause();
    // action
    await registerPage.selectDay.fill(dateOfBirth); //áp dụng với native date picker
    // verify
    await expect(registerPage.selectDay).toHaveValue(dateOfBirth);
    //await page.pause();
});