import { Page, expect } from "@playwright/test";
import {RegisterPage} from "../pages/register.page";
import {Config} from "../Config/config"
import { interest,country } from "../data/selects";
import { HomePage } from "../pages/home.page";
import  inputData  from "../data/inputData.json";
import { text } from "stream/consumers";
export class RegisterAction
{
    // Declare variables
    private page: Page;
    private registerPage: RegisterPage;
    private homePage: HomePage;
    
    //Define values
    constructor (page: Page)
    {
        this.page = page;
        this.registerPage = new RegisterPage(page);
        this.homePage = new HomePage(page);
    }
    
    // 3. Implement actions:
    async gotoRegisterPage()
    {
        //await this.page.goto(Config.baseUrl + "01-xpath-register-page.html");
        //await this.registerPage.open();
        // Như này mới đúng chuẩn Page Object Model: chỉ có action đơn dản mới viết trong page, còn action phức tạp hơn thì viết trong action:
        await this.homePage.gotoHome();
        await this.homePage.clickRegisterLink();
    }
 
    // Cách 1: đang dùng 1 record trong file inputData.json để test:
    async submitForm(record: any)
    {
        //Input: name, email, textarea:
        await this.registerPage.inputtextArea(record.description);
        await this.registerPage.inputtextNameAtt(record.userName);
        await this.registerPage.inputEmail(record.email);
        //Choose radios:
        await this.registerPage.checkRadioFemale();
        //Choose checkboxes
        await this.registerPage.checkReading(); 
        //Choose items in selection:
        await this.registerPage.selectInterests([interest.Music, interest.Sports]);
        await this.registerPage.selectACountry(country.Canada);
        // Load a file:
        await this.registerPage.chooseFileSetInput(record.uploadFilePath);
        //Drag and drop Rating:
        await this.registerPage.setRating(record.rating);
        //Submit:
        await this.registerPage.clickRegisterButton();
    }
    async verifyRecordAdded(record: any)
    {
        // Tìm tất cả tag tr có trong root (document)  mà text có chứ email 
        const row = this.page.locator('tr', { hasText: record.email}); //giả sử email là duy nhất, nếu không có thể dùng thêm các thuộc tính khác để xác định đúng row cần verify, ví dụ: hasText: `${record.userName} ${record.email}` hoặc dùng các thuộc tính khác như data-testid nếu có. Cách này sẽ giúp xác định chính xác row chứa record vừa được thêm vào mà không bị nhầm lẫn với các record khác có cùng tên hoặc email.
        await expect(row).toBeVisible();   
        const expectedTexts = [
            record.userName,
            record.email,
            record.gender,
            record.description,
            String(record.rating)
        ];   
        //Verify từng text trong mảng expectedTexts có xuất hiện trong row (record vừa thêm vào) hay không:
        //await expect(row).toContainText(text);
        // hoặc dùng toHaveText để kiểm tra toàn bộ nội dung của row:
        await expect(row).toHaveText(new RegExp(record)); //sử dụng RegExp để kiểm tra nếu text có thể xuất hiện ở bất kỳ vị trí nào trong row, không cần phải khớp toàn bộ nội dung của row.
        console.log(`Verified record with email: ${record.email} is added successfully.`);
        console.log('record: ', record);
        this.page.pause();
    }

    // Cách 2: đang dùng vòng for để lấy từng record trong file inputData.json
    // Như vậy sẽ không giống data driven test

    async verifyUserRecord(record: any) {
        const row = this.page.locator('tr', { hasText: record.email}); //giả sử email là duy nhất, nếu không có thể dùng thêm các thuộc tính khác để xác định đúng row cần verify, ví dụ: hasText: `${record.userName} ${record.email}` hoặc dùng các thuộc tính khác như data-testid nếu có. Cách này sẽ giúp xác định chính xác row chứa record vừa được thêm vào mà không bị nhầm lẫn với các record khác có cùng tên hoặc email.
        await expect(row).toBeVisible();

        const expectedTexts = [
            record.userName,
            record.email,
            `Gender: ${record.gender}`,
            `Biography: ${record.description}`,
            `Rating: ${record.rating}`
        ];

        for (const text of expectedTexts) {
            //await expect(row).toContainText(text);
            // hoặc dùng toHaveText để kiểm tra toàn bộ nội dung của row:
            await expect(row).toHaveText(new RegExp(text)); //sử dụng RegExp để kiểm tra nếu text có thể xuất hiện ở bất kỳ vị trí nào trong row, không cần phải khớp toàn bộ nội dung của row.
        }
    }
 
    async CheckElements()
    {
        //Lấy tất cả data từ file inputData.ts:
        for (const record of inputData)    
            {
                //Input: name, email, textarea:
                await this.registerPage.inputtextArea(record.description);
                await this.registerPage.inputtextNameAtt(record.userName);
                await this.registerPage.inputEmail(record.email);

                //Choose radios:
                //await this.registerPage.checkRadioSex4('Male');
                await this.registerPage.checkRadioFemale();
                // Verify Female is checked:
                await expect(this.registerPage.radioFemale).toBeChecked();
                await this.registerPage.checkRadioMale();
                // Verify Male is checked:
                await expect(this.registerPage.radioMale).toBeChecked();
                //await this.registerPage.unCheckRadioFemale();
                // await this.registerPage.checkRadioMale();
                // await this.registerPage.checkRadioSex('Female');
                // await this.registerPage.checkRadioSex2('Male');
                // await this.registerPage.checkRadioSex3('Female');

                //Choose checkboxes
                await this.registerPage.checkReading();
                // Verify Reading is checked:
                await expect(this.registerPage.checkboxReading).toBeChecked();  
                await this.registerPage.unCheckReading();
                // Verify Reading is unchecked:
                await expect(this.registerPage.checkboxReading).not.toBeChecked();
                //Choose items in selection:
                await this.registerPage.selectInterests([interest.Music, interest.Sports]);
                await this.registerPage.selectACountry(country.Canada);

                // Load a file:
                //playwright không làm cách này:
                //await this.registerPage.chooseFilePressEnter();
                //Mà nó sử dụng setInputFiles để chọn file:
                //Sử dụng đường dẫn tuyệt đối:
                //await this.registerPage.chooseFileSetInput('C:\\AllInOne\\playwright\\playwrightvn\\data\\interest.ts');
                //Sử dụng đường dẫn tương đối:
                await this.registerPage.chooseFileSetInput(record.uploadFilePath);

                //Drag and drop Rating:
                await this.registerPage.setRating(record.rating);
                // await this.page.pause();
                // await this.registerPage.setRating(5);
                // await this.page.pause();
                // await this.registerPage.setRating(10);
                // await this.page.pause();

                //Submit:
                //Verify button is enabled before click:
                await expect(this.registerPage.registerButton).toBeEnabled();
                await this.registerPage.clickRegisterButton();
                //await this.page.pause();

                //Sau khi submit sẽ verify record đã được thêm vào table:
                await this.verifyUserRecord(record);    
        }

    }
    /*
    async CheckElements(valueTextArea: string, valueTextNameAtt: string, valueEmail: string)
    {
        //Input: name, email, textarea:
        await this.registerPage.inputtextArea(valueTextArea);
        await this.registerPage.inputtextNameAtt(valueTextNameAtt);
        await this.registerPage.inputEmail(valueEmail);

        //Choose radios:
        //await this.registerPage.checkRadioSex4('Male');
        await this.registerPage.checkRadioFemale();
        await this.registerPage.checkRadioMale();
        //await this.registerPage.unCheckRadioFemale();
        // await this.registerPage.checkRadioMale();
        // await this.registerPage.checkRadioSex('Female');
        // await this.registerPage.checkRadioSex2('Male');
        // await this.registerPage.checkRadioSex3('Female');

        //Choose checkboxes
        await this.registerPage.checkReading();
        await this.registerPage.unCheckReading();
        
        //Choose items in selection:
        await this.registerPage.selectInterests([interest.Music, interest.Sports]);
        await this.registerPage.selectACountry(country.Canada);
        
        // Load a file:
        //playwright không làm cách này:
        //await this.registerPage.chooseFilePressEnter();
        //Mà nó sử dụng setInputFiles để chọn file:
        //Sử dụng đường dẫn tuyệt đối:
        //await this.registerPage.chooseFileSetInput('C:\\AllInOne\\playwright\\playwrightvn\\data\\interest.ts');
        //Sử dụng đường dẫn tương đối:
        await this.registerPage.chooseFileSetInput('./data/test.dat');

        //Drag and drop Rating:
        await this.registerPage.setRating(3);
        // await this.page.pause();
        // await this.registerPage.setRating(5);
        // await this.page.pause();
        // await this.registerPage.setRating(10);
        // await this.page.pause();

        //Submit:
        await this.registerPage.clickRegisterButton();
        await this.page.pause();

        //Sau khi submit sẽ verify record đã được thêm vào table:
    }
    */    
}