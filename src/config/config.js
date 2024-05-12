import dotenv from 'dotenv';

if(process.env.NODE_ENV === 'production'){
    dotenv.config({ path: '.env.production' });
} else {
    dotenv.config({ path: '.env.development' });
}

//Definir entorno
const ENV = process.env.NODE_ENV ?? 'development';

// Definir configuración
const CONFIG = {
    development: {
    app: {
        PORT: process.env.PORT || 3001
    },
},
    production : {
        app: {
            PORT: process.env.PORT || 3002
        }
    }
};

export default CONFIG[ENV]; 