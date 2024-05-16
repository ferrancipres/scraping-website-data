export const getNews = async (req, res) => {
    res.status(200).send('Hola mundo desde el controlador de noticias');
};

export const getNewsByNumber = async (req, res) => {
    res.status(200).send('Hola mundo desde el controlador de noticias con número de página');
};