import { GoogleSpreadsheet } from "google-spreadsheet";
import { scrapeHighRatedBooks } from "./scrape.js";
import dotenv from "dotenv";
dotenv.config();

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const secrets = require("../credentials.json");

async function addBooksToGoogleSheet() {
    // GoogleSpreadsheetクラスを使用してスプレッドシートを取得
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

    // サービスアカウント認証情報を設定
    await doc.useServiceAccountAuth({
        client_email: secrets.client_email,
        private_key: secrets.private_key,
    });

    // スプレッドシート情報を読み込む
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    // ヘッダーがない場合は追加
    if (!sheet.headerValues || sheet.headerValues.length === 0) {
        console.log("Adding headers to the sheet...");
        await sheet.setHeaderRow(["title", "price"]);
    }

    // 書籍情報を取得
    const books = await scrapeHighRatedBooks(process.env.TARGET_URL, "Mystery");

    console.log(books);

    // 書籍情報をスプレッドシートに追加
    await sheet.addRows(books);

    console.log("Rows added successfully");
}

export { addBooksToGoogleSheet };
