import { scrapeNews } from '../scraper.js';
import { scrapeNewsByPage } from '../scraper.js';
import { createClient } from 'redis';

// let cliente;
// if (process.env.NODE_ENV === 'production') {
//   cliente = createClient({
//     legacyMode: true,
//     socket: {
//       port: '6379',
//       host: 'redis'
//     }
//   });
// } else {
//   cliente = createClient({
//       port: '6379',
//       host: 'localhost'
//   });
// }

const cliente = createClient({
  legacyMode: true,
  socket: {
    port: '6379',
    host: 'redis'
  }
});
 

cliente
  .on('error', err => {
    console.error('Error connecting to Redis: ', err);
  })
  .on('connect', () => {
    console.log('Connected to Redis');
  })
  .connect();

export const getNews = async (req, res) => {
  try {
    let news;
    const reply = await cliente.get('news_1');
    if(reply) {
      news = JSON.parse(reply);
    } else {
      news = await scrapeNews();
      await cliente.set('news_1', JSON.stringify(news));
    }
    res.status(200).json(news);
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
      const reply = await cliente.get(`news_${i}`);
      if(reply) {
        news.push(...JSON.parse(reply));
        lastPageInCache = i;
      } else {
        break;
      }
    }

    if (lastPageInCache < pageId) {
      for (let i = lastPageInCache + 1; i <= pageId; i++) {
        const pageNews = i === 1 ? await scrapeNews() : await scrapeNewsByPage(i);
        news.push(...pageNews);
        await cliente.set(`news_${i}`, JSON.stringify(pageNews));
      }
    }

    res.status(200).json(news);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
