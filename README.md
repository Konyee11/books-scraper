# 📚 Books Scraper


## Overview / 概要

**English:**  
Books Scraper is a Node.js application designed to scrape book data (title, price, and availability) from the [Books to Scrape](https://books.toscrape.com/) website and save the results to Google Sheets. This project is perfect for learning web scraping and integrating cloud storage solutions.

**日本語:**  
Books Scraperは、[Books to Scrape](https://books.toscrape.com/) から書籍データ（タイトル、価格、在庫状況）をスクレイピングし、Google Sheetsに保存するNode.jsアプリケーションです。ウェブスクレイピングやクラウドストレージとの統合を学ぶのに最適なプロジェクトです。


## Features / 機能

**English:**  
- Scrapes book details including:
  - Title
  - Price
  - Availability status
- Saves data directly to Google Sheets.
- Built using modern web automation tools.

**日本語:**  
- 書籍情報をスクレイピング:
  - タイトル
  - 価格
  - 在庫状況
- データをGoogle Sheetsに直接保存。
- 最新のウェブ自動化ツールを使用して構築。


## Requirements / 必要条件

**English:**  
- Node.js (v14 or later)  
- A Google Cloud project with the Sheets API enabled  
- A valid `credentials.json` file from Google Cloud  
- NPM installed  

**日本語:**  
- Node.js（バージョン14以上）  
- Google Cloudプロジェクト（Sheets APIを有効化済み）  
- Google Cloudからダウンロードした有効な`credentials.json`ファイル  
- NPMインストール済み  


## Setup / セットアップ

**English:**  

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/books-scraper.git
   cd books-scraper
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Google Sheets API:
   - Enable Google Sheets API in your Google Cloud project.
   - Download the `credentials.json` file and place it in the project root.

4. Create a `.env` file with the following content:
   ```
   SPREADSHEET_ID=your_spreadsheet_id
   ```

**日本語:**  

1. リポジトリをクローン:
   ```bash
   git clone https://github.com/your-username/books-scraper.git
   cd books-scraper
   ```

2. 依存関係をインストール:
   ```bash
   npm install
   ```

3. Google Sheets APIのセットアップ:
   - Google CloudプロジェクトでGoogle Sheets APIを有効化。
   - `credentials.json`ファイルをダウンロードしてプロジェクトルートに配置。

4. `.env`ファイルを作成:
   ```
   SPREADSHEET_ID=your_spreadsheet_id
   ```


## Usage / 使用方法

**English:**  

1. Run the scraper:
   ```bash
   node index.js
   ```

2. The script will scrape book data and save it to your specified Google Sheets document.

**日本語:**  

1. スクレイピングを実行:
   ```bash
   node index.js
   ```

2. 書籍データが指定したGoogle Sheetsに保存されます。


## Tech Stack / 使用技術

**English:**  
- **Playwright**: For web scraping.  
- **Node.js**: Backend development.  
- **Google Sheets API**: For cloud data storage.

**日本語:**  
- **Playwright**: ウェブスクレイピング用。  
- **Node.js**: バックエンド開発用。  
- **Google Sheets API**: クラウドデータ保存用。


## License / ライセンス

**English:**  
This project is licensed under the MIT License. See the `LICENSE` file for details.

**日本語:**  
このプロジェクトはMITライセンスの下で提供されています。詳細は `LICENSE` ファイルを参照してください。
