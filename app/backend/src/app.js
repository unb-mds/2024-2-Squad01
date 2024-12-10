import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`Server ativo na porta ${port}`);
});