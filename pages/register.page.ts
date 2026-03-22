import {Page, Locator } from "@playwright/test";
import {Config} from "../Config/config";
import { interest,country } from "../data/selects";

export class RegisterPage{
    /*************************************************/
    //1. Declare variable and initialize in constructor:
    readonly page: Page;
    constructor(page: Page)
    {
        this.page = page;
    }

    /*************************************************/
    // 2. Define locators as getter:
    get radioMale()
    {
        return this.page.locator('#male');
    }
    get radioFemale()
    {
        return this.page.locator('#female');
    }
    get email()
    {
        return this.page.getByRole('textbox', { name: 'email' });
    }
    
    get checkboxReading()
    {
        return this.page.locator('[value ="reading"]');
    }
    get checkboxTraveling()
    {
        return this.page.locator('[name = "hobbies"][value ="traveling"]');
    }
    get textArea()
    {
        return this.page.locator('[name = "bio"]');
    }
    get textNameAtt()
    {
        return this.page.locator('[name ="username"]');
    }
    get textNameId()
    {
        return this.page.locator('#username');
    }
    //selection - options
    get selectInterest()
    {
        return this.page.locator('#interests');
    }
    get selectCountry()
    {
        return this.page.locator('#country');
    }
    // date of birth:
    get selectDay()
    {
        //return this.page.getByTestId('dbo'); // chỉ dùng getByTestId khi khi element có data-testid
        return this.page.locator('#dob'); // vì element này có id = "dob" nên dùng # để lấy theo id
    }
    //choose file:
    get chooseFile()
    {
        return this.page.locator('#profile');
    }
    //Move mouse to change value of rating:
    get rating()
    {
        return this.page.locator('#rating');
    }
    // Tooltip:
    get tooltip()
    {
        return this.page.locator('.tooltip'); // vì class = "tooltip" nên dùng . để lấy đây là lấy theo css selector, nếu có nhiều class thì dùng dấu chấm để phân tách, ví dụ class="tooltip tooltiptext" thì selector sẽ là '.tooltip.tooltiptext'
    }
    //Submit button:
    get registerButton()
    {
        return this.page.getByRole('button', { name: 'Register' });
    }
    /*************************************************/
    // 3. Implement actions:
    // define actions (basic actions)
    // async open()
    // {
    //     await this.page.goto(Config.baseUrl);
    // }
    async inputtextArea(nameValue: string)
    {
        await this.textArea.fill(nameValue);
    }
    async inputtextNameAtt(nameValue: string)
    {
        await this.textNameAtt.fill(nameValue);
    }
    async inputEmail(emailValue: string)
    {
        await this.email.fill(emailValue);
    }
    async clickRadioMale()
    {
        await this.radioMale.click();
    }
    // đúng ra nên sử dụng check thay vì click để chọn radio, check sẽ tự động bỏ chọn radio khác nếu có
    async checkRadioMale()
    {
        await this.radioMale.check();
    }
    async clickRadioFemale()
    {
        await this.radioFemale.click();
    }
    async checkRadioFemale()
    {
        await this.radioFemale.check() // check sẽ tự động bỏ chọn radio khác nếu có    ;
    }    
    async unCheckRadioFemale()
    {
        await this.radioFemale.uncheck();
    }       
    async checkRadioSex (sex: string)
    {
        if (sex == "Male")
            await this.radioMale.click();
        else if (sex =="Female")
            await this.radioFemale.click();
        else
        {
            throw new Error ('Invalid sex: ${sex}');
        }
    }
    // Cách 2: định nghĩa các values cho tham số sex, phát hiện lỗi ngay khi code, không cần phải run
    async checkRadioSex2 (sex: 'Male'|'Female')
    {
        if (sex === 'Male')
        {
            await this.radioMale.click();
        }
        else
        {
            await this.radioFemale.click();
        }
    }
    // Cách 3: Cách pro nhất vì cũng phát hiện lỗi ngay khi code và  không dùng if/else, dễ mở rộng, code clean
    async checkRadioSex3 (sex: 'Male'|'Female')
    {
        const sexMap = {
            Male: this.radioMale,
            Female: this.radioFemale,
        };
        await sexMap[sex].click();
    }
    //Cách 4: sử dụng check thay vì click, check sẽ tự động bỏ chọn radio khác nếu có
    async checkRadioSex4 (sex: 'Male'|'Female')
    {
        const sexMap = {
            Male: this.radioMale,
            Female: this.radioFemale,
        };
        await sexMap[sex].check();
    }
    // Checkboxes cũng tương tự như radio nhưng có thể chọn nhiều cái cùng lúc, không cần bỏ chọn cái khác:
    async checkReading()
    {
        await this.checkboxReading.check();
    }
    async unCheckReading()
    {
        await this.checkboxReading.uncheck();
    }
    //choose file:
    // async chooseFilePressEnter()
    // {
    //     await this.chooseFile.press('Enter');
    // }
    async chooseFileSetInput(filePath: string) 
    {
        await this.chooseFile.setInputFiles(filePath); 
    } 

    // selection - options 
    async selectInterests(values: interest | interest[])
    {
        await this.selectInterest.selectOption(values);
    }
    async selectACountry(values: country)
    {
        await this.selectCountry.selectOption(values);
    }
    // Rating - move mouse to change value:
    // Hãy viết comment rõ ràng cho hàm này, vì nó khá phức tạp:
    /**
     * Set the rating by moving the mouse to the appropriate position on the rating element.
     * @param value The rating value to set (e.g., 1-10).
     */
    async setRating(value: number)
    {   
        // Cách 1: đơn dản nhất là dùng fill:
        //await this.rating.fill(String(value)); // Cách đơn giản nhất nếu rating là input, nhưng nếu rating là một phần tử đặc biệt không phải input thì có thể sử dụng cách dưới đây để di chuyển chuột đến vị trí tương ứng với giá trị rating:
        //cách 2: dùng evaluate: thực thi mã JavaScript ngay trong trình duyệt
        await this.rating.evaluate((el: HTMLInputElement, value) => { //evaluate cho phép tực thi mã JavaScript ngay trong trình duyệt.            
        el.value = value;
        el.dispatchEvent(new Event('input', { bubbles: true })); // giống như user đang kéo chuột để thay đổi giá trị
        el.dispatchEvent(new Event('change', { bubbles: true })); // giống như user thả chuột ra để hoàn thành việc chọn rating
        }, String(value));
    }    
    //Hover vào tooltip để hiển thị tooltip text:
    async hoverTooltip()
    {
        await this.tooltip.hover();
    }   
    // Register:
    async clickRegisterButton()
    {
        await this.registerButton.click();  
    }

}
    //1. Declare variable:
    //readonly page: Page;
    // readonly radioMale: Locator;
    // readonly radioFemale: Locator;
    // readonly checkboxReading: Locator;
    // readonly checkboxTraveling: Locator;
    // readonly textArea: Locator;
    // readonly textNameAtt: Locator;
    // readonly textNameId: Locator;

    // define values for variables
    // constructor(page: Page)
    // {
    //     this.page = page;
    //   // locators:
    //   this.radioMale = page.locator('#male'); // lay theo Id #
    //   this.radioFemale = page.locator('#female');
    //   this.checkboxReading = page.locator('[value ="reading"]'); //lay theo thuoc tinh attribute
    //   this.checkboxTraveling = page.locator('[name = "hobbies"][value ="traveling"]'); //lay theo thuoc tinh attribute
    //   this.textArea  = page.locator('[name = "bio"]');
    //   this.textNameAtt = page.locator('[name ="username"]'); 
    //   this.textNameId = page.locator('#username'); 
