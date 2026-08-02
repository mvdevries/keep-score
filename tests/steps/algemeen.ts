import { expect } from "@playwright/test";
import { Given, When, Then } from "../support/fixtures.js";

const TABS = ["Spellen", "Spelers", "Templates", "Tools"];
const TAB_ID: Record<string, string> = {
  Spellen: "tab-games",
  Spelers: "tab-players",
  Templates: "tab-templates",
  Tools: "tab-tools"
};

Given("ik open de app", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("tab-games")).toBeVisible();
});

When("ik de app open", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("tab-games")).toBeVisible();
});

Given("de volgende spelers bestaan:", async ({ app }, tabel: { hashes: () => Array<{ naam: string; kleur: string }> }) => {
  await app.opslag({
    players: tabel.hashes().map((rij, i) => ({ id: "p" + (i + 1), name: rij.naam, color: rij.kleur }))
  });
});

When("ik naar het tabblad {string} ga", async ({ page }, naam: string) => {
  await page.getByTestId(TAB_ID[naam]).click();
});

Then("zie ik de tabbladen Spellen, Spelers, Templates en Tools", async ({ page }) => {
  await expect(page.locator(".tabbar-inner .tab")).toHaveCount(4);
  for (const naam of TABS) {
    await expect(page.getByTestId(TAB_ID[naam])).toBeVisible();
  }
});

Then("staat het tabblad {string} open", async ({ page }, naam: string) => {
  await expect(page.getByTestId(TAB_ID[naam])).toHaveClass(/is-active/);
});

Then("zie ik de tekst {string}", async ({ page }, tekst: string) => {
  await expect(page.getByText(tekst, { exact: false }).first()).toBeVisible();
});

Then("zie ik de melding {string}", async ({ page }, tekst: string) => {
  await expect(page.getByTestId("toast")).toHaveText(tekst);
});

Then("zie ik {int} spelers in de lijst", async ({ page }, aantal: number) => {
  await expect(page.getByTestId("spelerrij")).toHaveCount(aantal);
});

Then("zie ik de speler {string}", async ({ page }, naam: string) => {
  await expect(page.locator('[data-testid="spelerrij"][data-speler="' + naam + '"]')).toBeVisible();
});

When("ik de speler {string} toevoeg", async ({ page }, naam: string) => {
  await page.getByTestId("speler-naam").fill(naam);
  await page.getByTestId("speler-toevoegen").click();
});

When("ik de speler {string} verwijder", async ({ page }, naam: string) => {
  await page
    .locator('[data-testid="spelerrij"][data-speler="' + naam + '"]')
    .getByTestId("speler-verwijderen")
    .click();
});
