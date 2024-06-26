import { chromium } from 'playwright';

export async function scrapeNews() {
    const browser = await chromium.launch({
        headless: true,
        defaultViewport: null
    });

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://news.ycombinator.com/');
    await page.waitForSelector('tr.athing');

    const news = await page.evaluate(() => {
        const rows = document.querySelectorAll('tr.athing');
        const news = [];
        rows.forEach(row => {
            const rank = row.querySelector('td.title > span.rank')?.innerText.replace('.', '') || null;
            const title = row.querySelector('td.title > span > a').innerText;
            const url = row.querySelector('td.title > span > a').href;
            const score = row.nextElementSibling.querySelector('td.subtext > span.subline > span.score')?.innerText || null;
            const author = row.nextElementSibling.querySelector('td.subtext > span.subline > a.hnuser')?.innerText || null;
            const age = row.nextElementSibling.querySelector('td.subtext > span.subline > span.age > a')?.innerText || null;
            const clickyHider = row.nextElementSibling.querySelector('td.subtext > span.subline > a:nth-last-child(2)')?.innerText || null;
            const comments = row.nextElementSibling.querySelector('td.subtext > span.subline > a:last-child')?.innerText || null;

            news.push({ rank, title, url, score, author, age, clickyHider, comments});
        });
        return news;

    });

    await context.close();
    await browser.close();
    console.log(news);
    return news;
};

export async function scrapeNewsByPage(i) {
    const browser = await chromium.launch({
        headless: true,
        defaultViewport: null
    });

    const allNews = [];

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://news.ycombinator.com/?p=' + i);
    await page.waitForSelector('tr.athing');

    const news = await page.evaluate(() => {
        const rows = document.querySelectorAll('tr.athing');
        const news = [];
        rows.forEach(row => {
            const rank = row.querySelector('td.title > span.rank')?.innerText.replace('.', '') || null;
            const title = row.querySelector('td.title > span > a').innerText;
            const url = row.querySelector('td.title > span > a').href;
            const score = row.nextElementSibling.querySelector('td.subtext > span.subline > span.score')?.innerText || null;
            const author = row.nextElementSibling.querySelector('td.subtext > span.subline > a.hnuser')?.innerText || null;
            const age = row.nextElementSibling.querySelector('td.subtext > span.subline > span.age > a')?.innerText || null;
            const clickyHider = row.nextElementSibling.querySelector('td.subtext > span.subline > a:nth-last-child(2)')?.innerText || null;
            const comments = row.nextElementSibling.querySelector('td.subtext > span.subline > a:last-child')?.innerText || null;

            news.push({ rank, title, url, score, author, age, clickyHider, comments});
        });
        return news;
    });

    allNews.push(...news);
    await context.close();

    await browser.close();
    console.log(allNews);
    return allNews;
};