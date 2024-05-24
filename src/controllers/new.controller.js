import { scrapeNews } from '../scraper.js';
import { scrapeNewsByPage } from '../scraper.js';
import { createClient } from 'redis';

let client = createClient({
  host: 'redis',
  port: 6379
});

client
  .on('error', err => {
    console.error('Error connecting to Redis: ', err);
  })
  .on('connect', () => {
    console.log('Connected to Redis');
  })
  .connect();

export const getNews = async (req, res) => {
  try {
    const reply = await client.get('news_1');
    if(reply) {
      console.log('Retrieved news from Redis');
      return res.status(200).json(JSON.parse(reply));
    } else {
      const news = await scrapeNews();
      await client.set('news_1', JSON.stringify(news));
      console.log('Retrieved news by scraping');
      res.status(200).json(news);
    }
  } catch(err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

export const getNewsByPage = async (req, res) => {
  const pageId = req.params.pageId;
  try {
    let news = [];
    let lastPageInCache = 0;
    for (let i = 1; i <= pageId; i++) {
      const reply = await client.get(`news_${i}`);
      if(reply) {
        console.log(`Retrieved news for page ${i} from Redis`);
        news.push(...JSON.parse(reply));
        lastPageInCache = i;
      } else {
        break;
      }
    }

    if (lastPageInCache < pageId) {
      for (let i = lastPageInCache + 1; i <= pageId; i++) {
        const pageNews = i === 1 ? await scrapeNews() : await scrapeNewsByPage(i);
        console.log(`Retrieved news for page ${i} by scraping`);
        news.push(...pageNews);
        await client.set(`news_${i}`, JSON.stringify(pageNews));
      }
    }

    res.status(200).json(news);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
