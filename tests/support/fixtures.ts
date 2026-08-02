import { test as base, createBdd } from "playwright-bdd";
import type { Page } from "@playwright/test";

export type Opslag = {
  v?: number;
  seeded?: boolean;
  paletteV?: number;
  players?: Array<{ id: string; name: string; color: string }>;
  games?: unknown[];
  templates?: unknown[];
  history?: unknown[];
  tools?: { sub: string; secs: number; dice: number };
};

export const OPSLAG_SLEUTEL = "scorebord:v3";

export type SpelOpties = {
  naam?: string;
  winScore?: number;
  winMode?: "high" | "low";
  levels?: boolean;
  sort?: string;
};

export function maakSpel(spelers: string[], opties: SpelOpties = {}) {
  const kleuren = ["#3F8F52", "#C8442F", "#2F6FBF", "#B8860B", "#7A4FB0", "#1F7A6B"];
  const players = spelers.map((naam, i) => ({
    id: "p" + (i + 1),
    name: naam,
    color: kleuren[i % kleuren.length]
  }));
  const game = {
    id: "g1",
    name: opties.naam ?? "Spelavond",
    templateId: null,
    winScore: opties.winScore ?? 0,
    winMode: opties.winMode ?? "high",
    levels: opties.levels ?? true,
    sort: opties.sort ?? "score",
    date: "1 aug 2026",
    updated: 1000,
    won: null,
    entrants: players.map((p) => ({ pid: p.id, level: 1, scores: [] as Array<{ v: number; t: number }> }))
  };
  return { players, games: [game] };
}

async function zetOpslag(page: Page, data: Opslag) {
  const volledig: Opslag = {
    v: 3,
    seeded: true,
    paletteV: 2,
    players: [],
    games: [],
    templates: [],
    history: [],
    tools: { sub: "timer", secs: 30, dice: 2 },
    ...data
  };
  await page.addInitScript(
    ([sleutel, waarde]) => window.localStorage.setItem(sleutel as string, waarde as string),
    [OPSLAG_SLEUTEL, JSON.stringify(volledig)] as const
  );
}

async function zetWillekeur(page: Page, reeks: number[]) {
  await page.addInitScript((waarden) => {
    let i = 0;
    Math.random = () => {
      const v = (waarden as number[])[i % (waarden as number[]).length];
      i++;
      return v;
    };
  }, reeks);
}

type Hulp = {
  opslag: (data: Opslag) => Promise<void>;
  willekeur: (reeks: number[]) => Promise<void>;
  leesOpslag: () => Promise<Opslag | null>;
};

export const test = base.extend<{ app: Hulp }>({
  app: async ({ page }, use) => {
    await use({
      opslag: (data) => zetOpslag(page, data),
      willekeur: (reeks) => zetWillekeur(page, reeks),
      leesOpslag: async () =>
        page.evaluate((sleutel) => {
          const raw = window.localStorage.getItem(sleutel as string);
          return raw ? JSON.parse(raw) : null;
        }, OPSLAG_SLEUTEL)
    });
  }
});

export const { Given, When, Then } = createBdd(test);
