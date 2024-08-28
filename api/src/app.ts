import express from 'express';
import router from '../src/routes';

const app = express();

app.use(router);

app.listen(3000, () => {
    console.log('Rodando...')
})
