import { test, expect, type Page } from '@playwright/test';
import { BoxPage } from './box-table.po';
import { BoxDetailPage } from 'tests/box-detail/box-detail.po';

let boxPage: BoxPage;
let detailPage: BoxDetailPage;
let currentPage: Page;
const testData = {
  title: 'E2E TEST',
  type: 'Squared',
  image:
    'https://images.unsplash.com/photo-1630448927918-1dbcd8ba439b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  status: 'New',
  option: 'Red',
  price: '23',
  color: 'Red',
  description: 'This is a test box',
};

const updatedData = {
  title: 'UPDATED E2E TEST',
  type: 'Squared',
  image:
    'https://images.unsplash.com/photo-1630448927918-1dbcd8ba439b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  status: 'New',
  option: 'Red',
  price: '23',
  color: 'Red',
  description: 'This is a test box',
};

test.beforeEach(async ({ page }) => {
  boxPage = new BoxPage(page);
  detailPage = new BoxDetailPage(page);
  currentPage = page;
  await boxPage.goto();
});

// OPEN MODAL TEST
test('can openModal by clicking on button', async () => {
  const testTitle = ' Create box ';
  const testId = 'modal-title';

  await boxPage.openModal();
  // Wait for the modal title element to become visible
  await currentPage.waitForSelector(`[data-testid="${testId}"]`, {
    state: 'visible',
  });

  const modalTitle = await currentPage.$(`[data-testid="${testId}"]`);

  // Assert that the modal title has the expected text
  expect(await modalTitle.textContent()).toBe(testTitle);
});

// CREATE NEW BOX
test('can create a new box and verify success message', async () => {
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

  // Check if the success message element is visible
  const successToast = await boxPage.checkSuccess();
  expect(successToast).not.toBeNull();
});

test('can navigate to box detail page after creating a box', async () => {
  await waitForLoadingIndicatorToDisappear(boxPage.page);
  // Log that the search is about to be performed

  // Fill the search input with the createdBoxTitle
  await boxPage.searchInput.fill(testData.title);

  // Log that the search is complete
  await waitForLoadingIndicatorToDisappear(boxPage.page);

  // Find the first box in the table
  const firstBox = await boxPage.page.waitForSelector(
    'tr[data-testid="table-item"]',
    { timeout: 10000 }
  );

  if (!firstBox) {
    throw new Error('No boxes found in the table.');
  }

  const editButton = await firstBox.$('button[data-testid="edit-btn-test"]');

  if (!editButton) {
    throw new Error('Edit button not found in the first box item.');
  }
  // Click edit button
  await editButton.click();

  await boxPage.page.waitForSelector('[data-testid="loading-container"]', {
    state: 'hidden',
    timeout: 90000,
  });

  // Result check
  const expectedTitle = `Box Detail : ${testData.title}`;
  const retrievedTitle = await waitForTitleText(boxPage.page, expectedTitle);

  expect(retrievedTitle).toBe(expectedTitle);
});

// UPDATE BOX
test('can navigate to box detail page and update title', async () => {
  await waitForLoadingIndicatorToDisappear(boxPage.page);
  // Log that the search is about to be performed

  // Fill the search input with the createdBoxTitle
  await boxPage.searchInput.fill(testData.title);

  // Log that the search is complete
  await waitForLoadingIndicatorToDisappear(boxPage.page);

  // Find the first box in the table
  const firstBox = await boxPage.page.waitForSelector(
    'tr[data-testid="table-item"]',
    { timeout: 10000 }
  );

  if (!firstBox) {
    throw new Error('No boxes found in the table.');
  }

  const editButton = await firstBox.$('button[data-testid="edit-btn-test"]');

  if (!editButton) {
    throw new Error('Edit button not found in the first box item.');
  }
  // Click edit button
  await editButton.click();

  await boxPage.page.waitForSelector('[data-testid="loading-container"]', {
    state: 'hidden',
    timeout: 90000,
  });

  const expectedTitle = `Box Detail : ${testData.title}`;
  await waitForTitleText(boxPage.page, expectedTitle);

  // fill all the field
  await detailPage.updateBox(updatedData.title);

  const successToast = await boxPage.checkSuccess();

  expect(successToast).not.toBeNull();
});

test('check updated title by search and checking title on the detail page ', async () => {
  await waitForLoadingIndicatorToDisappear(boxPage.page);
  // Log that the search is about to be performed

  // Fill the search input with the createdBoxTitle
  await boxPage.searchInput.fill(updatedData.title);

  // Log that the search is complete
  await waitForLoadingIndicatorToDisappear(boxPage.page);

  // Find the first box in the table
  const firstBox = await boxPage.page.waitForSelector(
    'tr[data-testid="table-item"]',
    { timeout: 10000 }
  );

  if (!firstBox) {
    throw new Error('No boxes found in the table.');
  }

  const editButton = await firstBox.$('button[data-testid="edit-btn-test"]');

  if (!editButton) {
    throw new Error('Edit button not found in the first box item.');
  }
  // Click edit button
  await editButton.click();

  await boxPage.page.waitForSelector('[data-testid="loading-container"]', {
    state: 'hidden',
    timeout: 90000,
  });

  const expectedTitle = `Box Detail : ${updatedData.title}`;
  const retrievedTitle = await waitForTitleText(boxPage.page, expectedTitle);

  // fill all the field
  await detailPage.updateBox(updatedData.title);

  expect(retrievedTitle).toBe(expectedTitle);
});

// DELET MODAL AFTER CREATING A BOX AND NAVIGATING TO IT
test('can navigate to box detail page and trigger delete modal', async () => {
  await waitForLoadingIndicatorToDisappear(boxPage.page);
  // Log that the search is about to be performed

  // Fill the search input with the createdBoxTitle
  await boxPage.searchInput.fill(updatedData.title);

  // Log that the search is complete
  await waitForLoadingIndicatorToDisappear(boxPage.page);

  // Find the first box in the table
  const firstBox = await boxPage.page.waitForSelector(
    'tr[data-testid="table-item"]',
    { timeout: 10000 }
  );

  if (!firstBox) {
    throw new Error('No boxes found in the table.');
  }

  const editButton = await firstBox.$('button[data-testid="edit-btn-test"]');

  if (!editButton) {
    throw new Error('Edit button not found in the first box item.');
  }
  // Click edit button
  await editButton.click();

  await boxPage.page.waitForSelector('[data-testid="loading-container"]', {
    state: 'hidden',
    timeout: 90000,
  });

  const expectedTitle = `Box Detail : ${updatedData.title}`;
  await waitForTitleText(boxPage.page, expectedTitle);

  await detailPage.deleteButton.click();

  // Wait for the modal to appear
  const modal = await detailPage.page.waitForSelector('#modalEl', {
    state: 'visible',
  });

  // Check if the modal is visible
  expect(modal).not.toBeNull();
});

// DELET AFTER CREATING A BOX CONFIRMING IT
test('can navigate to box detail page and trigger delete success', async () => {
  await waitForLoadingIndicatorToDisappear(boxPage.page);
  // Log that the search is about to be performed

  // Fill the search input with the createdBoxTitle
  await boxPage.searchInput.fill(updatedData.title);

  // Log that the search is complete
  await waitForLoadingIndicatorToDisappear(boxPage.page);

  // Find the first box in the table
  const firstBox = await boxPage.page.waitForSelector(
    'tr[data-testid="table-item"]',
    { timeout: 10000 }
  );

  if (!firstBox) {
    throw new Error('No boxes found in the table.');
  }

  const editButton = await firstBox.$('button[data-testid="edit-btn-test"]');

  if (!editButton) {
    throw new Error('Edit button not found in the first box item.');
  }
  // Click edit button
  await editButton.click();

  await boxPage.page.waitForSelector('[data-testid="loading-container"]', {
    state: 'hidden',
    timeout: 90000,
  });

  const expectedTitle = `Box Detail : ${updatedData.title}`;
  await waitForTitleText(boxPage.page, expectedTitle);

  // click open modal
  await detailPage.deleteBox();

  // confirm delete
  await detailPage.confirmDelete();

  const successToast = await boxPage.checkSuccess();
  expect(successToast).not.toBeNull();
});

// HELPER FUNCTIONS
async function waitForTitleText(page: Page, expectedTitle: string) {
  let retries = 5; // Number of retries
  while (retries > 0) {
    const titleElement = await page
      .waitForSelector('[data-testid="box-title-header"]', { timeout: 60000 })
      .catch(() => null);
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

async function waitForLoadingIndicatorToDisappear(page: Page) {
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
