// Puerta de entrada a la aplicación
import app from './server.js';
import config from './config/config.js';

const PORT = config.app.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});