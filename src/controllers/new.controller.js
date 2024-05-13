import { scrapeNews } from '../scraper.js';
import { scrapeNewsByPage } from '../scraper.js';

export const getNews = async (req, res) => {
    try {
        const news = await scrapeNews();
        res.status(200).json(news);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// scraper con número de página
export const getNewsByPage = async (req, res) => {
    const i = req.params.pageId;
    try {
        const news = await scrapeNewsByPage(i);
        res.status(200).json(news);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

