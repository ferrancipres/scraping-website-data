import { scrapeNews } from '../scraper.js';
import { scrapeNewsByPage } from '../scraper.js';
import { createClient } from 'redis';

let client;

createClient()
  .on('error', err => {
    console.error(err);
  })

  .on('connect', () => {
    consolel.log('Connected to Redis');
  })

  .connect()
  .then((connectedClient) => {
    client = connectedClient;
  })
  .catch(() => {
    console.error('Failed to connect to Redis');
  });
  
  export const getNews = async (req, res) => {
    try {
      const reply = await client.get('news_1');
      if(reply) {
        console.log('News from Redis:', JSON.parse(reply)); // Add this line
        return res.status(200).json(JSON.parse(reply));
      }
  
      const news = await scrapeNews();
      console.log('Scraped news:', news); // Add this line
      await client.set('news_1', JSON.stringify(news));
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
      for (let i = 1; i <= pageId; i++) {
        const reply = await client.get(`news_${i}`);
        if(reply) {
          console.log(`News from Redis for page ${i}:`, JSON.parse(reply)); // Add this line
          news.push(...JSON.parse(reply));
          lastPageInCache = i;
        }
      }
  
      if (lastPageInCache < pageId) {
        for (let i = lastPageInCache + 1; i <= pageId; i++) {
          const pageNews = i === 1 ? await scrapeNews() : await scrapeNewsByPage(i);
          console.log(`Scraped news for page ${i}:`, pageNews); // Add this line
          news.push(...pageNews);
        }
      }
  
      res.status(200).json(news);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };