import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const input = path.join(projectRoot, "public", "brochure.html");
const output = path.join(projectRoot, "public", "brochure.pdf");

const browser = await puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});

try {
  const page = await browser.newPage();
  await page.goto(`file://${input}`, { waitUntil: "networkidle0" });
  await page.emulateMediaType("screen");
  await page.pdf({
    path: output,
    format: "A4",
    printBackground: true
  });
  console.log(`Wrote ${output}`);
} finally {
  await browser.close();
}

