import { expect } from "@playwright/test";
import { Given, When, Then } from "../support/fixtures.js";
import { maakSpel } from "../support/fixtures.js";

Given("een spel waarin de laagste wint met grens {int}", async ({ app }, grens: number) => {
  await app.opslag(maakSpel(["Bob", "Anne"], { winScore: grens, winMode: "low", sort: "low" }));
});

When("ik naast het menu tik", async ({ page }) => {
  await page.locator("#sheet-action .scrim").click({ position: { x: 10, y: 10 } });
  await page.waitForTimeout(300);
});

When("ik op Escape druk", async ({ page }) => {
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
});

When("ik de eindstand bewaar", async ({ page }) => {
  await page.getByTestId("bewaar-historie").or(page.getByTestId("bewaar-sluit")).click();
});

When("ik kies om door te spelen", async ({ page }) => {
  await page.getByTestId("doorspelen").click();
});

When("ik kies voor nog een potje", async ({ page }) => {
  await page.getByTestId("nog-een-potje").click();
});

When("ik het spel beëindig", async ({ page }) => {
  await page.getByTestId("beeindig").click();
});

Then("verschijnt het winstmenu", async ({ page }) => {
  await expect(page.getByTestId("win-titel")).toBeVisible();
});

Then("verschijnt het winstmenu niet", async ({ page }) => {
  await expect(page.getByTestId("win-titel")).toBeHidden();
});

Then("is het winstmenu nog open", async ({ page }) => {
  await expect(page.getByTestId("win-titel")).toBeVisible();
});

Then("staat er {string} in het winstmenu", async ({ page }, tekst: string) => {
  await expect(page.getByTestId("win-titel")).toHaveText(tekst);
});

Then("zie ik {int} items in de historie", async ({ page }, aantal: number) => {
  await page.getByTestId("tab-games").click();
  await page.getByTestId("tab-games").click();
  await page.getByTestId("toon-historie").click();
  await expect(page.getByTestId("historie-item")).toHaveCount(aantal);
});
