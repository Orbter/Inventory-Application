import 'dotenv/config';
console.log(
  '--- Is environment loaded? Check URL:',
  !!process.env.DATABASE_URL,
);
import express from 'express';
import cors from 'cors';
import itemRoutes from '@/routes/item.routes';
const app = express();
const port = Number(process.env.PORT) || 3001;
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

app.use(express.json());

app.use('/api', itemRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
