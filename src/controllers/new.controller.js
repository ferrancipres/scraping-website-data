
import { scrapeNews } from '../scraper.js';
import { scrapeNewsByPage } from '../scraper.js';
import { createClient } from 'redis';

let client;

createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .connect()
  .then((connectedClient) => {
    client = connectedClient;
  });

  export const getNews = async (req, res) => {
    try {
        const reply = await client.get('news_1');
        if(reply) {
            return res.status(200).json(JSON.parse(reply));
        }

        const news = await scrapeNews();
        await client.set('news_1', JSON.stringify(news));
        res.status(200).json(news);
    } catch(err) {
        console.error(err);
        res.status(500).send(err.message);
    }
};

// scraper con número de página
export const getNewsByPage = async (req, res) => {
    const pageId = req.params.pageId;
    try {
        let lastPageInCache = 0;
        let news = [];
        for (let i = 1; i <= pageId; i++) {
            const reply = await client.get(`news_${i}`);
            if(reply) {
                news.push(...JSON.parse(reply));
                lastPageInCache = i;
            }
        }

        if (lastPageInCache < pageId) {
            for (let i = lastPageInCache + 1; i <= pageId; i++) {
                const pageNews = i === 1 ? await scrapeNews() : await scrapeNewsByPage(i);
                news.push(...pageNews);
                await client.set(`news_${i}`, JSON.stringify(pageNews));
            }
        }

        res.status(200).json(news);
    } catch (error) {
        res.status(500).send(error.message);
    }
};