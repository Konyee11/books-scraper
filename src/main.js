import { chromium } from "playwright";
import dotenv from "dotenv";
dotenv.config();

/**
 * 書籍の星評価を取得します。
 * @param {import('playwright').Locator} bookLocator 書籍の要素
 * @returns {Promise<number>} 星評価（1〜5）
 */
async function getStarRating(bookLocator) {
    const starClass = await bookLocator
        .locator(".star-rating")
        .getAttribute("class");

    // 三項演算子を使った条件分岐
    return starClass.includes("One")
        ? 1
        : starClass.includes("Two")
        ? 2
        : starClass.includes("Three")
        ? 3
        : starClass.includes("Four")
        ? 4
        : starClass.includes("Five")
        ? 5
        : 0; // 該当なしの場合
}

/**
 * 書籍のタイトルと価格を取得します。
 * @param {import('playwright').Page} page Playwrightのページオブジェクト
 * @param {import('playwright').Locator} bookLocator 書籍のリンク要素
 * @returns {Promise<{ title: string, price: string }>} 書籍のタイトルと価格
 */
async function getBookDetails(page, bookLocator) {
    await bookLocator.click(); // 書籍の詳細ページに移動

    // タイトルと価格を取得
    const title = await page.locator(".product_main h1").innerText();
    const price = await page.locator(".product_main .price_color").innerText();

    // 元のページに戻る
    await page.goBack();
    await page.waitForLoadState("load");
    return { title, price };
}

/**
 * 高評価（星5）の書籍情報を取得します。
 * @param {string} targetUrl 対象URL
 * @returns {Promise<{ title: string, price: string }[]>} 高評価の書籍情報を格納した配列
 */
async function scrapeHighRatedBooks(targetUrl) {
    if (!targetUrl) throw new Error("Target URL is not defined.");

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(targetUrl);

    const highRatedBooks = [];
    let hasNextPage = true;

    while (hasNextPage) {
        const books = page.locator(".product_pod");
        const count = await books.count();

        for (let i = 0; i < count; i++) {
            const bookLocator = books.nth(i);
            const starRating = await getStarRating(bookLocator);

            if (starRating === 5) {
                const details = await getBookDetails(
                    page,
                    bookLocator.locator("h3 a")
                );
                highRatedBooks.push(details);
            }
        }

        // 次のページの確認と遷移
        const nextPage = page.locator("li.next a");
        hasNextPage = await nextPage.isVisible();
        if (hasNextPage) {
            await nextPage.click();
            await page.waitForLoadState("load");
        }
    }

    await browser.close();
    return highRatedBooks;
}

// 実行部分：環境変数からURLを取得して実行
(async () => {
    try {
        const targetUrl = process.env.TARGET_URL;
        const books = await scrapeHighRatedBooks(targetUrl);
        console.log("High rated books:", books);
    } catch (error) {
        console.error("Error:", error);
    }
})();
