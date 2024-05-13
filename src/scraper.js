import { chromium } from 'playwright';

// Genera un ámbito autoejecutable para poder usar async/await
(async () => {
    const browser = await chromium.launch({
        headless: false,
        defaultViewport: null
    });

    //Generar contexto de navegación en el navegador
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://news.ycombinator.com/');
    await page.waitForSelector('tr.athing');

    const news = await page.evaluate(() => {
        // Para seleccionar todas las filas de noticias
        const rows = document.querySelectorAll('tr.athing');
        const news = [];
        rows.forEach(row => {
            const title = row.querySelector('td.title > span > a').innerText;
            const url = row.querySelector('td.title > span > a').href;
            const subtitle = row.nextElementSibling.querySelector('td.subtext > span').innerText;
            // const subtitle = row.nextElementSibling.querySelector('td.subtext > span.score').innerText;
            news.push({ title, subtitle, url });
        });
        return news;

    });
    await context.close();
    await browser.close();
    console.log(news);
})();