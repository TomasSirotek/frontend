import { test, expect, type Page } from "@playwright/test";
import { BoxPage } from "./box-table.po";


let boxPage: BoxPage;
let currentPage: Page;
const testData = {
    title: "Test Box",
    type: "Squared",
    image: "https://example.com/image.jpg",
    status: "New",
    option: "Red",
    price: "23",
    color: "Red",
    description: "This is a test box",
  };

test.beforeEach(async ({ page }) => {
    boxPage = new BoxPage(page);
    currentPage = page;
    await boxPage.goto();
});

test("can openModal by clicking on button", async () => {
    const testTitle = " Create box ";
    const testId = 'modal-title';

    await boxPage.openModal();

    // Wait for the modal title element to become visible
    await currentPage.waitForSelector(`[data-testid="${testId}"]`, { state: 'visible' });

    const modalTitle = await currentPage.$(`[data-testid="${testId}"]`);
    
    // Assert that the modal title has the expected text
    expect(await modalTitle.textContent()).toBe(testTitle);
});


test("can create a new box and verify success message", async () => {
    await boxPage.createBox(
      testData.title,
      testData.image,
      testData.description,
      testData.type,
      testData.status,
      testData.option,
      testData.price,
      testData.color
    );
  
    // Check if the success message is displayed
    const successMessage = "Success"; // Change this to match your success message
  
    // Use a selector that matches the success toast message
    const successToastSelector = `.toast-success >> text=/${successMessage}/`;
  
    await boxPage.page.waitForSelector(successToastSelector);
  
    // Check if the success message element is visible
    const successToast = await boxPage.page.$(successToastSelector);
    expect(successToast).not.toBeNull();

  
  });


  test("can navigate to box detail page after creating a box", async () => {
    // Create a new box and retrieve its title
   
    // Retrieve the title of the created box
    const createdBoxTitle = testData.title;

    // Locate the created box in the table by its title and click it
    const boxRowSelector = `tr[data-testid="edit-btn-test"][data-title="${createdBoxTitle}"]`;
    await boxPage.page.click(boxRowSelector);

    // Check if the title on the details page matches the created box's title
    const titleOnDetailPage = await boxPage.page.textContent('[data-testid="box-title"]');
    expect(titleOnDetailPage).toBe(createdBoxTitle);
});



//   test("displays all error messages when submitted with invalid inputs", async () => {
//     const testData = {
//       title: "",
//       type: "",
//       image: "",
//       status: "",
//       option: "",
//       price: "",
//       color: "Select color",
//       description: "",
//     };
  
//     await boxPage.createBox(
//       testData.title,
//       testData.image,
//       testData.description,
//       testData.type,
//       testData.status,
//       testData.option,
//       testData.price,
//       testData.color
//     );
  
//     // Use waitForSelector to wait for the error messages to appear with a timeout
//     const timeoutMilliseconds = 20000; // Adjust the timeout as needed
//     const nameErrorSelector = 'div.text-red-500:has-text("Name is required.")';
//     const colorErrorSelector = 'div.text-red-500:has-text("Please select a valid color.")';
//     const priceErrorSelector = 'div.text-red-500:has-text("Price must be a valid number.")';
//     const descriptionErrorSelector = 'div.text-red-500:has-text("Description is required.")';
  
//     await boxPage.page.waitForSelector(nameErrorSelector, {
//       state: "visible",
//       timeout: timeoutMilliseconds,
//     });
//     await boxPage.page.waitForSelector(colorErrorSelector, {
//       state: "visible",
//       timeout: timeoutMilliseconds,
//     });
//     await boxPage.page.waitForSelector(priceErrorSelector, {
//       state: "visible",
//       timeout: timeoutMilliseconds,
//     });
//     await boxPage.page.waitForSelector(descriptionErrorSelector, {
//       state: "visible",
//       timeout: timeoutMilliseconds,
//     });
  
//     // Now, you can check if these elements are visible
//     const nameError = await boxPage.page.isVisible(nameErrorSelector);
//     const colorError = await boxPage.page.isVisible(colorErrorSelector);
//     const priceError = await boxPage.page.isVisible(priceErrorSelector);
//     const descriptionError = await boxPage.page.isVisible(descriptionErrorSelector);
  
//     expect(nameError).toBe(true);
//     expect(colorError).toBe(true);
//     expect(priceError).toBe(true);
//     expect(descriptionError).toBe(true);
//   });
  


 



  

