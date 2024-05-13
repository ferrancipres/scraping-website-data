import { chromium } from 'playwright';

// Define el número de páginas a raspar
let numPages = 2; // Cambia este valor según sea necesario

(async () => {
    const browser = await chromium.launch({
        headless: false,
        defaultViewport: null
    });

    const context = await browser.newContext();
    const news = [];

    for (let i = 1; i <= numPages; i++) {
        const page = await context.newPage();
        await page.goto(`https://news.ycombinator.com/?p=${i}`);
        await page.waitForSelector('tr.athing');

        const pageNews = await page.evaluate(() => {
            const rows = document.querySelectorAll('tr.athing');
            const pageNews = [];
            rows.forEach(row => {
                const rank = row.querySelector('td.title > span.rank')?.innerText.replace('.', '') || null;
                const title = row.querySelector('td.title > span > a').innerText;
                const url = row.querySelector('td.title > span > a').href;
                const score = row.nextElementSibling.querySelector('td.subtext > span.subline > span.score')?.innerText || null;
                const author = row.nextElementSibling.querySelector('td.subtext > span.subline > a.hnuser')?.innerText || null;
                const age = row.nextElementSibling.querySelector('td.subtext > span.subline > span.age > a')?.innerText || null;
                const clickyHider = row.nextElementSibling.querySelector('td.subtext > span.subline > a:nth-last-child(2)')?.innerText || null;
                const comments = row.nextElementSibling.querySelector('td.subtext > span.subline > a:last-child')?.innerText || null;

                pageNews.push({ rank, title, url, score, author, age, clickyHider, comments});
            });
            return pageNews;
        });

        news.push(...pageNews);
        await page.close();
    }

    await context.close();
    await browser.close();
    console.log(news);
})();