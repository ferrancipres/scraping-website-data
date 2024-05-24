import { scrapeNews } from '../scraper.js';
import { scrapeNewsByPage } from '../scraper.js';
import { createClient } from 'redis';

let client;
let redisAvailable = false;
let connectionErrorLogged = false;

createClient()
  .on('error', err => {
    redisAvailable = false;
    if (!connectionErrorLogged) {
      console.log('Redis connection status: ', redisAvailable ? 'Connected' : 'Disconnected');
      connectionErrorLogged = true;
    }
  })

  .on('connect', () => {
    redisAvailable = true;
    connectionErrorLogged = false;
    console.log('Redis connection status: ', redisAvailable ? 'Connected' : 'Disconnected');
  })

  .connect()
  .then((connectedClient) => {
    client = connectedClient;
    redisAvailable = true;
    connectionErrorLogged = false;
    console.log('Redis connection status: ', redisAvailable ? 'Connected' : 'Disconnected');
  })
  .catch(() => {
    redisAvailable = false;
    if (!connectionErrorLogged) {
      console.log('Redis connection status: ', redisAvailable ? 'Connected' : 'Disconnected');
      connectionErrorLogged = true;
    }
  });
  
  export const getNews = async (req, res) => {
    try {
      if (redisAvailable) {
        const reply = await client.get('news_1');
        if(reply) {
          console.log('Retrieved news from Redis');
          return res.status(200).json(JSON.parse(reply));
        }
      }
  
      const news = await scrapeNews();
      if (redisAvailable) {
        await client.set('news_1', JSON.stringify(news));
      }
      console.log('Retrieved news by scraping');
      res.status(200).json(news);
    } catch(err) {
      console.error(err);
    }
  };
  
  export const getNewsByPage = async (req, res) => {
    const pageId = req.params.pageId;
    try {
      let lastPageInCache = 0;
      let news = [];
      if (redisAvailable) {
        for (let i = 1; i <= pageId; i++) {
          const reply = await client.get(`news_${i}`);
          if(reply) {
            console.log(`Retrieved news for page ${i} from Redis`);
            news.push(...JSON.parse(reply));
            lastPageInCache = i;
          }
        }
      }
  
      if (!redisAvailable || lastPageInCache < pageId) {
        for (let i = lastPageInCache + 1; i <= pageId; i++) {
          const pageNews = i === 1 ? await scrapeNews() : await scrapeNewsByPage(i);
          console.log(`Retrieved news for page ${i} by scraping`);
          news.push(...pageNews);
          if (redisAvailable) {
            await client.set(`news_${i}`, JSON.stringify(pageNews));
          }
        }
      }
  
      res.status(200).json(news);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };