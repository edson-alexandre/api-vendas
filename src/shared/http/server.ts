import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes/index';
import AppError from '../errors/AppError';
import '@shared/typeorm/index';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);
app.use(errors());

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    } else {
        return response.status(500).json({
            status: 'Error',
            // message: 'Internal server error',
            error,
        });
    }
});

app.listen(3333, () => {
    console.log('Server started on port 3333');
});
