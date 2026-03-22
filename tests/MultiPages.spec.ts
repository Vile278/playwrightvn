import { test, expect, Page } from "@playwright/test";
import {RegisterAction} from "../actions/register.action";

test ('Input data', async({page}) => {
  
  // Khởi tạo object
  const page1 = new RegisterAction(page);

  // Khai báo tạm các const lưu data:
  const vText = "Viet";
  const vName = "Nam";

  // call actions
  // Cách 1: dùng JavaScript thuần:
  // await home.gotoHome();
  // await home.fillText(vText,vName);
  // //open new page:
  // const page2 = await page.evaluate(() => window.open('https://google.com.vn', '_blank'));
  // // back to previous page:
  // await page.bringToFront();
  // await page.pause();
  
  //làm việc với nhiều pages: chuyển qua chuyển lại giữa các page:
  await page1.gotoRegisterPage();
  await page1.CheckElements();
  const newPagePromise = page.context().waitForEvent('page');
  await page.evaluate(() => window.open('https://google.com.vn', '_blank'));
  const page2 = await newPagePromise;
  await page2.bringToFront();
  //await page2.pause();
  await page.bringToFront();
  //await page.pause();
  await page2.bringToFront();
  //await page2.pause();
  await page.close();

});

  //Thay vì viết kiểu hổ lốn như thế  này:

    // await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');

    //   // locators:
    //   const radioMale = page.locator('#male'); // lay theo Id #
    //   const radioFemale = page.locator('#female');
    //   const checkboxReading = page.locator('[value ="reading"]'); //lay theo thuoc tinh attribute
    //   const checkboxTraveling = page.locator('[name = "hobbies"][value ="traveling"]'); //lay theo thuoc tinh attribute
    //   const textArea  = page.locator('[name = "bio"]');
    //   const textNameAtt = page.locator('[name ="username"]'); 
    //   const textNameId = page.locator('#username'); 

    //   // Actions:
    //   await textNameAtt.fill("Viet A");
    //   await textNameId.fill("Viet B");
    //   await checkboxTraveling.check();
    //   await textArea.fill("Vile 2026");
    //   await radioMale.check();
    //   await radioFemale.check();
    //   await checkboxReading.check();
    //   await page.pause();
