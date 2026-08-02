import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../../app/", import.meta.url));
const PORT = Number(process.env.PORT || 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json"
};

createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  let pad = decodeURIComponent(url.pathname);
  if (pad.endsWith("/")) pad += "index.html";

  const doel = join(ROOT, normalize(pad).replace(/^(\.\.[/\\])+/, ""));
  if (!doel.startsWith(ROOT)) {
    res.writeHead(403).end("Verboden");
    return;
  }

  try {
    const body = await readFile(doel);
    res.writeHead(200, {
      "Content-Type": TYPES[extname(doel)] || "application/octet-stream",
      "Cache-Control": "no-cache",
      "Service-Worker-Allowed": "/"
    });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Niet gevonden");
  }
}).listen(PORT, () => {
  console.log(`Keep Score draait op http://localhost:${PORT}`);
});
