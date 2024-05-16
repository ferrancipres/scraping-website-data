import dotenv from 'dotenv';

if(process.env.NODE_ENV === 'production'){
    dotenv.config({ path: '.env.production' });
} else {
    dotenv.config({ path: '.env.development' });
}

const ENV = process.env.NODE_ENV ?? 'development';
const CONFIG = {
    development: {
    app: {
        PORT: process.env.PORT || 3000
    },
},
    production : {
        app: {
            PORT: process.env.PORT || 3002 
        }
    }
};

export default CONFIG[ENV]; 