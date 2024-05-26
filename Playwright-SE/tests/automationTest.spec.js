// @ts-check
const { test, expect } = require("@playwright/test");

test("has title", async ({ page }) => {
  await page.goto("http://127.0.0.1:5501/index.html");
  await expect(page).toHaveTitle("Emporium");
});

test("email", async ({ page }) => {
  await page.goto("http://127.0.0.1:5501/index.html");
  await page.getByPlaceholder("Email Address").click();
  await page.getByPlaceholder("Email Address").fill("ahmed.ajanovic@mail.com");
});

test("WhatIsEmporiumButtons", async ({ page }) => {
  await page.goto("http://127.0.0.1:5501/faq.html");
  await page.getByRole("button", { name: "What is Emporium? +" }).click();
  await page.getByRole("button", { name: "What is Emporium? −" }).click();
});

test("submitButton", async ({ page }) => {
  await page.goto("http://127.0.0.1:5501/faq.html");
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button", { name: "SUBMIT" }).click();
});

test("inputText", async ({ page }) => {
  await page.goto("http://127.0.0.1:5501/index.html");
  await page.getByPlaceholder("Search for Gold Jewellery,").click();
  await page.getByPlaceholder("Search for Gold Jewellery,").fill("abcde");
  await page.getByPlaceholder("Search for Gold Jewellery,").press("Enter");
});

test("shoppinList", async ({ page }) => {
  await page.goto("http://127.0.0.1:5501/index.html");
  await page.locator("#navLinks").getByRole("link").first().click();
  await page
    .locator("#earrings-container div")
    .filter({ hasText: "$100.00 Buy Now!" })
    .locator("#buy")
    .click();
});

test("mapa", async ({ page }) => {
  await page.goto("http://127.0.0.1:5501/aboutUs.html");

  // Sačekajte da se iframe učita
  const frameHandle = await page.waitForSelector("iframe");
  if (!frameHandle) {
    throw new Error("iframe not found");
  }
  const frame = await frameHandle.contentFrame();

  if (!frame) {
    throw new Error("frame content not found");
  }

  // Sačekajte da se elementi unutar iframe-a učitaju
  await frame.waitForSelector('[aria-label="Uvećaj"]');

  // Povećajte mapu
  await frame.click('[aria-label="Uvećaj"]');
  await frame.click('[aria-label="Uvećaj"]');
  await frame.click('[aria-label="Umanji"]');
});

test("button", async ({ page }) => {
  await page.goto("http://127.0.0.1:5501/");
  await page.getByRole("link", { name: "Explore Now" }).click();
  await page.getByRole("link", { name: "FAQ" }).click();
});
