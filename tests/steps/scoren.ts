import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { Given, When, Then } from "../support/fixtures.js";
import { maakSpel } from "../support/fixtures.js";

const TOETS: Record<string, string> = {
  "+": "toets-plus",
  "-": "toets-min",
  "−": "toets-min",
  "×": "toets-keer",
  "*": "toets-keer",
  "=": "toets-is",
  C: "toets-wis",
  "⌫": "toets-backspace"
};

function toetsId(teken: string) {
  return TOETS[teken] ?? "toets-" + teken;
}

async function drukToetsen(page: Page, reeks: string) {
  for (const teken of reeks.trim().split(/\s+/)) {
    await page.getByTestId(toetsId(teken)).click();
  }
}

async function wachtTotSheetsDicht(page: Page) {
  await expect(page.locator(".sheet.is-open")).toHaveCount(0);
}

async function opnenScoreVoor(page: Page, naam: string) {
  await wachtTotSheetsDicht(page);
  await page.locator('[data-testid="spelerkaart"][data-speler="' + naam + '"]').click();
  await expect(page.getByTestId("keypad")).toBeVisible();
}

async function slaOp(page: Page) {
  await page.getByTestId("punten-opslaan").click();
  await wachtTotSheetsDicht(page);
}

Given("een spel met de spelers {word} en {word}", async ({ app }, a: string, b: string) => {
  await app.opslag(maakSpel([a, b]));
});

Given("een spel met de spelers {word} en {word} en winscore {int}", async ({ app }, a: string, b: string, score: number) => {
  await app.opslag(maakSpel([a, b], { winScore: score }));
});

When("ik het spel open", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("spelkaart").first().click();
  await expect(page.getByTestId("spel-menu")).toBeVisible();
});

When("ik op de speler {string} tik", async ({ page }, naam: string) => {
  await opnenScoreVoor(page, naam);
});

When("ik de toetsen {string} indruk", async ({ page }, reeks: string) => {
  await drukToetsen(page, reeks);
});

When("ik de punten opsla", async ({ page }) => {
  await slaOp(page);
});

When("ik {string} {int} punten geef", async ({ page }, naam: string, punten: number) => {
  await opnenScoreVoor(page, naam);
  await drukToetsen(page, String(punten).split("").join(" "));
  await slaOp(page);
});

When("ik de rondes bekijk", async ({ page }) => {
  await page.getByTestId("toon-rondes").click();
});

When("ik de eerste ronde wis", async ({ page }) => {
  await page.getByTestId("ronde-wissen").first().click();
});

When("ik het level verhoog", async ({ page }) => {
  await page.getByTestId("level-omhoog").click();
});

When("ik het level verlaag", async ({ page }) => {
  await page.getByTestId("level-omlaag").click();
});

Then("toont het display {string}", async ({ page }, waarde: string) => {
  await expect(page.getByTestId("display-waarde")).toHaveText(waarde);
});

Then("is het display leeg", async ({ page }) => {
  await expect(page.getByTestId("display-waarde")).toHaveAttribute("data-leeg", "true");
});

Then("toont de som {string}", async ({ page }, som: string) => {
  await expect(page.getByTestId("display-som")).toHaveText(som);
});

Then("is de som leeg", async ({ page }) => {
  await expect(page.getByTestId("display-som")).toHaveText("");
});

Then("toont de hint {string}", async ({ page }, hint: string) => {
  await expect(page.getByTestId("display-hint")).toContainText(hint);
});

Then("staat er op de opslaanknop {string}", async ({ page }, tekst: string) => {
  await expect(page.getByTestId("punten-opslaan")).toHaveText(tekst);
});

Then("is de opslaanknop uitgeschakeld", async ({ page }) => {
  await expect(page.getByTestId("punten-opslaan")).toBeDisabled();
});

Then("heeft {string} {int} punten", async ({ page }, naam: string, punten: number) => {
  const kaart = page.locator('[data-testid="spelerkaart"][data-speler="' + naam + '"]');
  await expect(kaart.getByTestId("spelerkaart-score")).toHaveText(String(punten));
});

Then("heeft {string} {int} ronde gespeeld", async ({ page }, naam: string, aantal: number) => {
  const kaart = page.locator('[data-testid="spelerkaart"][data-speler="' + naam + '"]');
  await expect(kaart.getByTestId("spelerkaart-meta")).toContainText(aantal + " ronde");
});

Then("heeft {string} {int} rondes gespeeld", async ({ page }, naam: string, aantal: number) => {
  const kaart = page.locator('[data-testid="spelerkaart"][data-speler="' + naam + '"]');
  await expect(kaart.getByTestId("spelerkaart-meta")).toContainText(aantal + " rondes");
});

Then("zie ik {int} rondes", async ({ page }, aantal: number) => {
  await expect(page.getByTestId("ronde")).toHaveCount(aantal);
});

Then("is het rondetotaal {int}", async ({ page }, totaal: number) => {
  await expect(page.getByTestId("rondes-totaal")).toHaveText(String(totaal));
});

Then("staat het level op {int}", async ({ page }, level: number) => {
  await expect(page.getByTestId("level-waarde")).toHaveText(String(level));
});

Then("is de knop level omlaag uitgeschakeld", async ({ page }) => {
  await expect(page.getByTestId("level-omlaag")).toBeDisabled();
});

When("ik de speler uit het spel haal", async ({ page }) => {
  await page.getByTestId("speler-eruit").click();
  await wachtTotSheetsDicht(page);
});

Then("zie ik alleen nog {string} op het scorebord", async ({ page }, naam: string) => {
  await expect(page.getByTestId("spelerkaart")).toHaveCount(1);
  await expect(page.locator('[data-testid="spelerkaart"][data-speler="' + naam + '"]')).toBeVisible();
});
