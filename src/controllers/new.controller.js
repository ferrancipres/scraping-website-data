//controller getNews
//scraper génerico de primera página
export const getNews = async (req, res) => {
    res.status(200).send('Get All News Ferran');
};

//controller getNewsByNumber
//scraper con número de página
export const getNewsByNumber = async (req, res) => {
    //linea de código para sacar el número por consola
    // console.log(req.params.number);
    res.status(200).send('Get News by Number Ferran');
};

