import { test, expect, type Page } from "@playwright/test";
import { BoxDetailPage } from "./box-detail.po";
import { BoxPage } from "tests/box/box-table.po";

let detailPage: BoxDetailPage;
let boxPage: BoxPage;
let currentPage: Page;

test.beforeEach(async ({ page }) => {
  detailPage = new BoxDetailPage(page);
  boxPage = new BoxPage(page);
  currentPage = page;
  await detailPage.goto();
});