import { expect } from "@playwright/test";
import { When, Then } from "../support/fixtures.js";

When("ik een template {string} maak met winscore {int}", async ({ page }, naam: string, score: number) => {
  await page.getByTestId("template-nieuw").click();
  await page.getByTestId("template-naam").fill(naam);
  await page.getByTestId("template-winscore").fill(String(score));
  await page.getByTestId("template-bewaren").click();
});

When("ik de template {string} wis", async ({ page }, naam: string) => {
  await page.locator('[data-testid="templaterij"][data-template="' + naam + '"]').getByTestId("template-wis").click();
});

When("ik een nieuw spel start met de template {string} en de spelers {word} en {word}", async ({ page }, template: string, a: string, b: string) => {
  await page.getByTestId("tab-games").click();
  await page.getByTestId("nieuw-spel").click();
  await page.locator('[data-testid="template-optie"][data-template="' + template + '"]').click();
  await page.locator('[data-testid="setup-speler"][data-speler="' + a + '"]').click();
  await page.locator('[data-testid="setup-speler"][data-speler="' + b + '"]').click();
  await page.getByTestId("spel-starten").click();
  await expect(page.getByTestId("spel-menu")).toBeVisible();
});

When("ik een vrij spel start met de spelers {word} en {word}", async ({ page }, a: string, b: string) => {
  await page.getByTestId("nieuw-spel").click();
  await page.getByTestId("template-vrij-spel").click();
  await page.locator('[data-testid="setup-speler"][data-speler="' + a + '"]').click();
  await page.locator('[data-testid="setup-speler"][data-speler="' + b + '"]').click();
  await page.getByTestId("spel-starten").click();
  await expect(page.getByTestId("spel-menu")).toBeVisible();
});

Then("zie ik de template {string}", async ({ page }, naam: string) => {
  await expect(page.locator('[data-testid="templaterij"][data-template="' + naam + '"]')).toBeVisible();
});

Then("zie ik de template {string} niet", async ({ page }, naam: string) => {
  await expect(page.locator('[data-testid="templaterij"][data-template="' + naam + '"]')).toHaveCount(0);
});
