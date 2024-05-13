import { scrapeNews } from '../scraper.js';
// import { scrapeNewsByPage } from '../scraper.js';

//controller getNews
//scraper génerico de primera página
// export const getNews = async (req, res) => {
//     res.status(200).send('Get All News Ferran');
// };
export const getNews = async (req, res) => {
    try {
        const news = await scrapeNews();
        res.status(200).json(news);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//scraper con número de página
// export const getNewsByPage = async (req, res) => {
//     //pageId es el número de la página y es el query param
//     const i = req.params.pageId;
//     console.log(i);
//     // res.status(200).send('Get News by Page');
//     try {
//         const news = await scrapeNewsByPage(i);
//         res.status(200).json(news);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
//     //linea de código para sacar el número por consola
//     // console.log(req.params.number);
//     // res.status(200).send('Get News by Number Ferran');
// };

