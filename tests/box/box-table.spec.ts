import { test, expect, type Page } from "@playwright/test";
import { BoxPage } from "./box-table.po";


let boxPage: BoxPage;
let currentPage: Page;
const testData = {
    title: "E2E TEST",
    type: "Squared",
    image: "https://images.unsplash.com/photo-1630448927918-1dbcd8ba439b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
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

// OPEN MODAL TEST
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

// CREATE NEW BOX 

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
    const createdBoxTitle = testData.title;
    
    console.log(createdBoxTitle)
    // Log that the test is starting
    console.log("Starting test...");

    await waitForLoadingIndicatorToDisappear(boxPage.page);
    // Log that the search is about to be performed
    console.log("Performing search...");

    // Fill the search input with the createdBoxTitle
    const searchInput = await boxPage.page.waitForSelector('input[data-testid="search-input"]');
    await searchInput.fill(createdBoxTitle);

    // Log that the search is complete
    console.log("Search complete.");

    // Wait for the loading indicator to disappear after the search
    await waitForLoadingIndicatorToDisappear(boxPage.page);

    // Log that the loading indicator has disappeared
    console.log("Loading indicator disappeared.");

    // Take a screenshot of the table after the search

    // Find the first box in the table
    const firstBox = await boxPage.page.waitForSelector('tr[data-testid="table-item"]', { timeout: 10000 });

    if (!firstBox) {
        throw new Error("No boxes found in the table.");
    }

        // // Click the "Edit" button inside the first box item
    const editButton = await firstBox.$('button[data-testid="edit-btn-test"]');

    if (!editButton) {
      throw new Error("Edit button not found in the first box item.");
    }
    await editButton.click();
   

    // Click the first box to navigate to its details page

    // await waitForDetailPageToLoad(boxPage.page);
    // Wait for the details page to load
    // await boxPage.page.waitForSelector('[data-testid="box-section"]', { timeout: 60000 });

    // Log that the details page is loaded
    await boxPage.page.waitForSelector('[data-testid="loading-container"]', { state: 'hidden', timeout: 90000 });

 

    

    const expectedTitle = `Box Detail : ${createdBoxTitle}`;
    const retrievedTitle = await waitForTitleText(boxPage.page, expectedTitle);
    
    expect(retrievedTitle).toBe(expectedTitle);

 
});

async function waitForTitleText(page, expectedTitle) {
    let retries = 5; // Number of retries
    while (retries > 0) {
      const titleElement = await page.waitForSelector('[data-testid="box-title-header"]', { timeout: 60000 }).catch(() => null);
      if (titleElement) {
        const receivedTitle = (await titleElement.textContent()).trim();
        if (receivedTitle === expectedTitle) {
          return receivedTitle; // Return the received title
        }
      }
      await page.waitForTimeout(1000); // Wait for 1 second before retrying
      retries--;
    }
    throw new Error(`Timed out waiting for title to be "${expectedTitle}"`);
  }
    // Check if the title on the details page matches the constructed title
//     const testId = 'box-title-header';

//    // await currentPage.waitForSelector(`[data-testid="${testId}"]`, { state: 'visible' });
// //
//     const modalTitle = await currentPage.$(`[data-testid="${testId}"]`);
    
    // Assert that the modal title has the expected text
  // START FROM Management/box and search box in search bar and click edit 
  // must match the title of the box you created in the previous test on the p
//   test("can navigate to box detail page after creating a box", async () => {
//     const createdBoxTitle = testData.title;

//     // Take a screenshot of the table before the search
//     await boxPage.page.screenshot({ path: `screenshots/${Date.now()}-table-before-search.png` });

//     // Fill the search input with the createdBoxTitle
//     const searchInput = await boxPage.page.waitForSelector('input[data-testid="search-input"]');
//     await searchInput.fill(createdBoxTitle);

//     // Wait for the loading indicator to disappear after the search
//     await waitForLoadingIndicatorToDisappear(boxPage.page);

//     // Take a screenshot of the table after the search
//     await boxPage.page.screenshot({ path: `screenshots/${Date.now()}-table-after-search.png` });

//     // Find the first box in the table
//     const firstBox = await boxPage.page.waitForSelector('tr[data-testid="table-item"]', { timeout: 10000 });

//     if (!firstBox) {
//         throw new Error("No boxes found in the table.");
//     }

//     // Verify that the first box contains the expected title
//     const firstBoxTitle = await firstBox.$eval('[data-testid="box-title"]', (el) => el.textContent);
//     if (firstBoxTitle !== createdBoxTitle) {
//         throw new Error(`The first box title "${firstBoxTitle}" does not match the created box title "${createdBoxTitle}".`);
//     }

//     // Click the first box to navigate to its details page
//     await firstBox.click();

//     // Wait for the details page to load
//     await boxPage.page.waitForSelector('[data-testid="box-title"]', { timeout: 10000 });

//     // Take a screenshot of the details page
//     await boxPage.page.screenshot({ path: `screenshots/${Date.now()}-details.png` });

    // if (!firstBox) {
    //     throw new Error("No boxes found in the table.");
    // }
    // // Click the "Edit" button inside the first box item
    // const editButton = await firstBox.$('button[data-testid="edit-btn-test"]');

    // if (!editButton) {
    //   throw new Error("Edit button not found in the first box item.");
    // }
    // await editButton.click();


    // // Wait for the details page to load (you may need to adjust the selector and timeout)
    // await boxPage.page.waitForSelector('[data-testid="box-title"]', { timeout: 60000 });
  
    // // Take a screenshot of the details page
    // await boxPage.page.screenshot({ path: `screenshots/${Date.now()}-details.png` });

    // await waitForDetailPageToLoad(boxPage.page);

    // await boxPage.page.screenshot({ path: `screenshots/${Date.now()}-details.png` });
  
    // const titleText = `Box Detail : ${createdBoxTitle}`;

    // // Check if the title on the details page matches the constructed title
    // // const titleOnDetailPage = await boxPage.page.textContent(`[data-testid="box-title"][title="${titleText}"]`);
    // const titleOnDetailPage2 = await boxPage.page.getByTestId(`[data-testid="box-title"]`);
    // expect(titleOnDetailPage2.innerText).toEqual(titleText);
//   });
  
  
// naviagte to the new box created and click edit button and updated everything inside the detail page and verifiy message update was succesfull






// naviagete to the new box created and click delete button and verify message delete was succesfull



async function waitForDetailPageToLoad(page) {
    const timeout = 10000; // Set a longer timeout if needed
    const startTime = Date.now();
  
    while (Date.now() - startTime < timeout) {
      // Check if the page is fully loaded, for example, by waiting for a specific element
      const detailsPageLoaded = await page.waitForSelector('[data-testid="box-section"]', { timeout: 10000 }).catch(() => false);
  
      if (detailsPageLoaded) {
        return; // Page is fully loaded
      }
  
      // Sleep for a short interval before checking again
      await page.waitForTimeout(1000);
    }
  
    throw new Error('Details page did not fully load within the timeout.');
  }
  

  
  
  async function waitForLoadingIndicatorToDisappear(page) {
    const timeout = 60000; // Set a timeout for waiting
  
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      // Check if the element is present using data-testid
      const loadingIndicator = await page.$('[data-testid="loading-indicator"]');
  
      // If the loading indicator is not found, exit the loop
      if (!loadingIndicator) {
        return;
      }
  
      // Sleep for a short interval before checking again
      await page.waitForTimeout(1000); // Adjust the interval as needed
    }
  
    throw new Error('Loading indicator did not disappear within the timeout.');
  }
  

//   test("can navigate to box detail page after creating a box", async () => {
//     // Create a new box and retrieve its title
   
//     // Retrieve the title of the created box
//     const createdBoxTitle = testData.title;

//     // Locate the created box in the table by its title and click it
//     const boxRowSelector = `tr[data-testid="edit-btn-test"][data-title="${createdBoxTitle}"]`;
//     await boxPage.page.click(boxRowSelector);

//     // Check if the title on the details page matches the created box's title
//     const titleOnDetailPage = await boxPage.page.textContent('[data-testid="box-title"]');
//     expect(titleOnDetailPage).toBe(createdBoxTitle);

//     await boxPage.page.waitForSelector('.boxes-table-item');

//     // Click the edit button
//     await boxPage.page.click('[data-testid="edit-btn-test"]');

//     // Wait for the editBox function to be called
//     await boxPage.page.waitForFunction(() => window['editBoxCalled']);

//     // Check that the editBox function was called with the correct argument
//     const editBoxArg = await boxPage.page.evaluate(() => window['editBoxArg']);
//     expect(editBoxArg).toBe(inventory.id);
// });



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
  


 



  

