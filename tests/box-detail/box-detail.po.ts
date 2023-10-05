import { Locator, Page } from '@playwright/test';
import { BoxPage } from 'tests/box/box-table.po';

export class BoxDetailPage {
  page: Page;

  boxPage: BoxPage;

  deleteButton: Locator
  confirmDeleteButton: Locator

  titleInput: Locator;
  updateButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.page = page;
    this.boxPage = new BoxPage(page);


    this.deleteButton = page.getByTestId('deleteButton');
    this.confirmDeleteButton = page.getByTestId('confirm-delete-modal');
    this.updateButton = page.getByTestId('updateButton');

    this.titleInput = page.getByTestId('title-detail-input')
  }



  async deleteBox(){
    await this.deleteButton.click()
  }

  async goto() {
    await this.boxPage.goto();
  }

  async confirmDelete(){
    await this.confirmDeleteButton.click()
  }

  async updateBox(title: string){
    await this.titleInput.fill(title);

    await this.updateButton.click();

  }
}
