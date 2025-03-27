import express, { urlencoded } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { mainRouter } from './routes/mainRouter'
const server = express()
const cookieParser = require('cookie-parser');

server.use(helmet())
server.use(urlencoded({ extended: true }));

server.use(cors({
    origin: "http://localhost:5173",
    credentials: true, 
})); 

server.disable('x-powered-by');
server.use(express.json());
server.use(cookieParser()); 

server.use(mainRouter);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
