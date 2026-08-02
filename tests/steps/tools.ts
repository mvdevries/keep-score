import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { Given, When, Then } from "../support/fixtures.js";

const TOOL_ID: Record<string, string> = { Timer: "tool-timer", Dobbelen: "tool-dice", Kiezer: "tool-pick" };

When("ik naar de tool {string} ga", async ({ page }, naam: string) => {
  await page.getByTestId("tool-menu").click();
  await page.getByTestId(TOOL_ID[naam]).click();
});

When("ik de timerpreset {int} kies", async ({ page }, sec: number) => {
  await page.getByTestId("timer-preset-" + sec).click();
});

Given("ik open de app met beheerde tijd", async ({ page }) => {
  await page.clock.install();
  await page.goto("/");
  await expect(page.getByTestId("tab-games")).toBeVisible();
});

When("ik de timer start", async ({ page }) => {
  await page.getByTestId("timer-start").click();
});

When("ik de timer pauzeer", async ({ page }) => {
  await page.getByTestId("timer-start").click();
});

When("ik de timer reset", async ({ page }) => {
  await page.getByTestId("timer-reset").click();
});

When("er {int} seconden verstrijken", async ({ page }, sec: number) => {
  await page.clock.runFor(sec * 1000);
});

Then("toont de timer {string}", async ({ page }, tijd: string) => {
  await expect(page.getByTestId("timer-tijd")).toHaveText(tijd);
});

Then("staat er {string} bij de timer", async ({ page }, tekst: string) => {
  await expect(page.getByTestId("timer-status")).toHaveText(tekst);
});

When("ik {int} stenen kies", async ({ page }, n: number) => {
  await page.getByTestId("dobbel-aantal-" + n).click();
});

When("ik gooi", async ({ page }) => {
  await page.getByTestId("dobbel-gooi").click();
  await expect(page.getByTestId("dobbel-gooi")).toBeEnabled({ timeout: 5000 });
});

When("ik op gooien tik zonder te wachten", async ({ page }) => {
  await page.getByTestId("dobbel-gooi").click();
});

When("het rollen klaar is", async ({ page }) => {
  await expect(page.getByTestId("dobbel-gooi")).toBeEnabled({ timeout: 5000 });
});

Then("zie ik {int} dobbelstenen", async ({ page }, n: number) => {
  await expect(page.getByTestId("dobbelsteen")).toHaveCount(n);
});

Then("liggen alle ogen tussen {int} en {int}", async ({ page }, laag: number, hoog: number) => {
  const ogen = await page.getByTestId("dobbelsteen").evaluateAll((els) =>
    els.map((e) => Number((e as HTMLElement).dataset.ogen))
  );
  expect(ogen.length).toBeGreaterThan(0);
  for (const o of ogen) {
    expect(o).toBeGreaterThanOrEqual(laag);
    expect(o).toBeLessThanOrEqual(hoog);
  }
});

Then("klopt het totaal met de stenen", async ({ page }) => {
  const ogen = await page.getByTestId("dobbelsteen").evaluateAll((els) =>
    els.map((e) => Number((e as HTMLElement).dataset.ogen))
  );
  const som = ogen.reduce((a, b) => a + b, 0);
  await expect(page.getByTestId("dobbel-totaal")).toHaveText(String(som));
});

Then("zijn de aantalknoppen uitgeschakeld", async ({ page }) => {
  for (let i = 1; i <= 6; i++) {
    await expect(page.getByTestId("dobbel-aantal-" + i)).toBeDisabled();
  }
});

Then("zijn de aantalknoppen weer bruikbaar", async ({ page }) => {
  for (let i = 1; i <= 6; i++) {
    await expect(page.getByTestId("dobbel-aantal-" + i)).toBeEnabled();
  }
});

const sessies = new WeakMap<Page, Awaited<ReturnType<Page["context"]>["newCDPSession"]>>();

async function cdpVoor(page: Page) {
  let sessie = sessies.get(page);
  if (!sessie) {
    sessie = await page.context().newCDPSession(page);
    sessies.set(page, sessie);
  }
  return sessie;
}

When("ik {int} vingers op het scherm leg", async ({ page }, aantal: number) => {
  const vlak = page.getByTestId("kiezer-vlak");
  const box = await vlak.boundingBox();
  if (!box) throw new Error("kiezer-vlak niet gevonden");

  const cdp = await cdpVoor(page);
  const punten: Array<{ x: number; y: number; id: number }> = [];
  for (let i = 0; i < aantal; i++) {
    punten.push({
      x: box.x + box.width * (0.25 + 0.25 * (i % 3)),
      y: box.y + box.height * (0.3 + 0.2 * Math.floor(i / 3)),
      id: i + 1
    });
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: punten });
  }
  await expect(page.getByTestId("kiezer-vinger")).toHaveCount(aantal);
});

When("ik alle vingers weghaal", async ({ page }) => {
  const cdp = await cdpVoor(page);
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
});

When("de kiezer zijn keuze maakt", async ({ page }) => {
  await expect(page.locator(".p2-finger.is-winner")).toHaveCount(1, { timeout: 6000 });
});

Then("zie ik {int} vingercirkels", async ({ page }, aantal: number) => {
  await expect(page.getByTestId("kiezer-vinger")).toHaveCount(aantal);
});

Then("heeft precies {int} vinger gewonnen", async ({ page }, aantal: number) => {
  await expect(page.locator(".p2-finger.is-winner")).toHaveCount(aantal);
});

Then("heeft de winnaar nummer {int}", async ({ page }, nummer: number) => {
  await expect(page.locator(".p2-finger.is-winner").getByTestId("kiezer-nummer")).toHaveText(String(nummer));
});

Then("zijn de nummers {int} tot en met {int} verdeeld", async ({ page }, van: number, tot: number) => {
  const nummers = await page.getByTestId("kiezer-nummer").allTextContents();
  const verwacht = Array.from({ length: tot - van + 1 }, (_, i) => String(van + i));
  expect(nummers.map(Number).sort((a, b) => a - b)).toEqual(verwacht.map(Number));
});
