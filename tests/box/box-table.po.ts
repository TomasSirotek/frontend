import { ElementHandle, Locator, Page } from '@playwright/test';
import { BoxDetailPage } from 'tests/box-detail/box-detail.po';

export class BoxPage {
  page: Page;

  creaBoxBtn: Locator;
  openModalButton: Locator;
  titleInput: Locator;
  statusInput: Locator;
  colorOption: Locator;
  typeInput: Locator;
  priceOption: Locator;
  imageInput: Locator;
  descInput: Locator;

  editButton: Locator;
  closeModalButton: Locator;
  openModalBtn: Locator;

  searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openModalBtn = page.getByTestId('open-modal-button');
    this.creaBoxBtn = page.getByTestId('create-box-button');
    //   this.closeModalButton = page.getByTestId("close-modal-button")s;

    this.titleInput = page.getByTestId('title');
    this.imageInput = page.getByTestId('image');
    this.typeInput = page.getByTestId('type');
    this.statusInput = page.getByTestId('status');
    this.colorOption = page.getByTestId('color');
    this.priceOption = page.getByTestId('price');
    this.descInput = page.getByTestId('description');

    this.searchInput = page.getByTestId('search-input');
  }

  async goto() {
    await this.page.goto('/management/boxes');
  }

  async openModal() {
    await this.openModalBtn.click();
  }

  async createBox(
    title: string,
    image: string,
    description: string,
    type: string,
    status: string,
    option: string,
    price: string,
    color: string
  ) {
    // open modal
    await this.openModalBtn.click();

    // fill form
    await this.titleInput.fill(title);
    await this.typeInput.fill(type);
    await this.imageInput.fill(image);
    await this.statusInput.fill(status);
    await this.priceOption.fill(price);
    await this.colorOption.selectOption(color);
    await this.descInput.fill(description);

    // submit form
    await this.creaBoxBtn.click();
  }

  async searchBox(title: string) {
    await this.searchInput.fill(title);
  }

  async checkSuccess() : Promise<ElementHandle<SVGElement | HTMLElement>> {
     // Check if the success message is displayed
     const successMessage = "Success"; // Change this to match your success message
  
     // Use a selector that matches the success toast message
     const successToastSelector = `.toast-success >> text=/${successMessage}/`;
   
     await this.page.waitForSelector(successToastSelector);
   
     // Check if the success message element is visible
    return await this.page.$(successToastSelector);

  }
}
