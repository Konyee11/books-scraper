import { chromium } from "playwright";
import dotenv from "dotenv";
dotenv.config();

async function getBooksByScraping() {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(process.env.TARGET_URL);
}

await getBooksByScraping();
