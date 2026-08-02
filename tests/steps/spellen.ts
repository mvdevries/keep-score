import { expect } from "@playwright/test";
import { When, Then } from "../support/fixtures.js";

Then("zie ik {int} spellen in de lijst", async ({ page }, aantal: number) => {
  await expect(page.getByTestId("spelkaart")).toHaveCount(aantal);
});

Then("zie ik het spellenoverzicht", async ({ page }) => {
  await expect(page.getByTestId("nieuw-spel").or(page.getByTestId("nieuw-spel-leeg"))).toBeVisible();
});

Then("zie ik de spelers {word} en {word} op het scorebord", async ({ page }, a: string, b: string) => {
  await expect(page.locator('[data-testid="spelerkaart"][data-speler="' + a + '"]')).toBeVisible();
  await expect(page.locator('[data-testid="spelerkaart"][data-speler="' + b + '"]')).toBeVisible();
});

When("ik terug ga", async ({ page }) => {
  await page.getByTestId("terug").click();
});

When("ik het spel hernoem naar {string}", async ({ page }, naam: string) => {
  await page.getByTestId("spel-menu").click();
  await page.getByTestId("menu-hernoemen").click();
  await page.locator("#rename-input").fill(naam);
  await page.locator('[data-act="rename-save"]').click();
});

Then("heet het spel {string}", async ({ page }, naam: string) => {
  await expect(page.getByTestId("spel-naam")).toHaveText(naam);
});

When("ik alle scores op nul zet", async ({ page }) => {
  await page.getByTestId("spel-menu").click();
  await page.getByTestId("menu-reset").click();
});

When("ik het spel weggooi", async ({ page }) => {
  await page.getByTestId("spel-menu").click();
  await page.getByTestId("menu-weggooien").click();
});
