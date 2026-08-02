import { expect } from "@playwright/test";
import { Given, When, Then } from "../support/fixtures.js";

const OUD_PALET = ["#2E6B3E", "#3F8F52", "#57B26B", "#7CC85C", "#A3CE3E", "#1E5033", "#5FB89A", "#86C258"];
const NIEUW_PALET = [
  "#3F8F52", "#C8442F", "#2F6FBF", "#B8860B", "#7A4FB0", "#1F7A6B",
  "#C2622D", "#B33F7A", "#4A56A6", "#6E8C1F", "#8A5A3C", "#2E6B3E"
];

Given("ik open de app zonder opgeslagen gegevens", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("tab-games")).toBeVisible();
});

Given("er zijn spelers met kleuren uit het oude palet", async ({ app }) => {
  await app.opslag({
    paletteV: 0,
    players: OUD_PALET.slice(0, 5).map((kleur, i) => ({ id: "p" + i, name: "Speler" + i, color: kleur }))
  });
});

Given("er is een speler met een zelfgekozen kleur", async ({ app }) => {
  await app.opslag({
    paletteV: 0,
    players: [
      { id: "p1", name: "Eigen", color: "#FF00FF" },
      { id: "p2", name: "Oud", color: "#86C258" }
    ]
  });
});

When("ik de pagina herlaad", async ({ page }) => {
  await page.waitForTimeout(250);
  await page.reload();
  await expect(page.getByTestId("tab-games")).toBeVisible();
});

Then("hebben de spelers de kleuren van het nieuwe palet op volgorde", async ({ app }) => {
  const data = await app.leesOpslag();
  const kleuren = (data?.players ?? []).map((p) => p.color);
  expect(kleuren.length).toBeGreaterThan(0);
  expect(kleuren).toEqual(NIEUW_PALET.slice(0, kleuren.length));
});

Then("hebben alle spelers een verschillende kleur", async ({ app }) => {
  const data = await app.leesOpslag();
  const kleuren = (data?.players ?? []).map((p) => p.color);
  expect(new Set(kleuren).size).toBe(kleuren.length);
});

Then("heeft {string} nog steeds de kleur {string}", async ({ app }, naam: string, kleur: string) => {
  const data = await app.leesOpslag();
  const speler = (data?.players ?? []).find((p) => p.name === naam);
  expect(speler?.color).toBe(kleur);
});
