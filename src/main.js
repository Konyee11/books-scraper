import { addBooksToGoogleSheet } from "./google-sheet.js";
import dotenv from "dotenv";
dotenv.config();

// 実行部分：環境変数からURLを取得して実行
(async () => {
    try {
        addBooksToGoogleSheet();
    } catch (error) {
        console.error("Error:", error);
    }
})();
