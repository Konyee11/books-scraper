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
        : 0;
}

/**
 * 書籍のタイトルを取得します。
 * @param {import('playwright').Page} page Playwrightのページオブジェクト
 * @param {import('playwright').Locator} bookLocator 書籍のリンク要素
 * @returns {Promise<string>} 書籍のタイトル
 */
async function getBookTitle(page, bookLocator) {
    await bookLocator.click(); // 書籍の詳細ページに移動
    const titleLocator = page.locator(".product_main h1");
    await titleLocator.waitFor(); // タイトル要素が表示されるのを待機
    const title = await titleLocator.innerText(); // タイトルを取得
    await page.goBack(); // 元のページに戻る
    await page.waitForLoadState("load"); // ページがロードされるのを待機
    return title;
}

/**
 * 高評価（星5）の書籍のタイトルを取得します。
 * @returns {Promise<string[]>} 高評価の書籍のタイトルを格納した配列
 */
async function scrapeHighRatedBooks() {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    if (!process.env.TARGET_URL) {
        throw new Error("TARGET_URL is not defined in .env");
    }
    await page.goto(process.env.TARGET_URL);

    const titles = []; // 星5の書籍タイトルを格納
    let hasNextPage = true; // 次のページの有無を管理

    // ページごとの処理を繰り返す
    while (hasNextPage) {
        const books = page.locator(".product_pod"); // 現在のページの書籍リスト
        const count = await books.count();

        // 各書籍について処理
        for (let i = 0; i < count; i++) {
            const bookLocator = books.nth(i); // 書籍の要素を取得
            const starRating = await getStarRating(bookLocator); // 星評価を取得

            if (starRating === 5) {
                const title = await getBookTitle(
                    page,
                    bookLocator.locator("h3 a")
                ); // 書籍タイトルを取得
                titles.push(title); // 配列に追加
            }
        }

        // 次のページの確認と遷移
        const nextPage = page.locator("li.next a");
        hasNextPage = await nextPage.isVisible();
        if (hasNextPage) {
            await nextPage.click();
            await page.waitForLoadState("load"); // 次のページがロードされるのを待機
        }
    }

    await browser.close();
    return titles; // 書籍タイトルのリストを返す
}

/**
 * 実行部分：高評価の書籍タイトルを取得し、結果を表示
 */
scrapeHighRatedBooks()
    .then((titles) => console.log("High rated books:", titles))
    .catch((error) => console.error("Error:", error));
