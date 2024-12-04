import { chromium } from "playwright";
import dotenv from "dotenv";
dotenv.config();

/**
 *
 * 高評価の書籍のタイトルを取得します。
 * @returns {Promise<string[]>} 高評価の書籍のタイトルを格納した配列
 */
async function scrapeHighRatedBooks() {
    /**
     * ブラウザを起動し、指定したURLにアクセスします。
     */
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(process.env.TARGET_URL);

    let titles = []; // 高評価の書籍のタイトルを格納する配列
    let hasNextPage = true; // 次のページが存在するかどうか

    /**
     * ページネーションが存在する場合、次のページに遷移し、
     * 高評価の書籍のタイトルを取得します。
     */
    while (hasNextPage) {
        const books = await page.locator(".product_pod");
        const count = await books.count();

        for (let i = 0; i < count; i++) {
            const starClass = await books
                .nth(i)
                .locator(".star-rating")
                .getAttribute("class");

            // 星の数に応じて評価を付けます
            const starRating = starClass.includes("One")
                ? 1
                : starClass.includes("Two")
                ? 2
                : starClass.includes("Three")
                ? 3
                : starClass.includes("Four")
                ? 4
                : starClass.includes("Five")
                ? 5
                : 0;

            // 星の数が5つの場合、書籍のタイトルを取得します
            if (starRating === 5) {
                // 書籍のリンクをクリック
                const bookLocator = await books.nth(i).locator("h3 a");
                await bookLocator.click();

                // タイトルを取得
                const titleLocator = await page.locator(".product_main h1");
                await titleLocator.waitFor();
                const title = await titleLocator.innerText();
                titles.push(title);

                // 戻る
                await page.goBack();
            }
        }

        /**
         * 次のページが存在する場合、次のページに遷移します。
         */
        const nextPage = await page.locator("li.next a");
        hasNextPage = (await nextPage.count()) > 0;
        if (hasNextPage) {
            await nextPage.click();
        }
    }

    await browser.close();

    return titles;
}

await scrapeHighRatedBooks()
    .then((titles) => console.log("High rated books:", titles))
    .catch((error) => console.error("Error:", error));
