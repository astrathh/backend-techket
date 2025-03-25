// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

// Criar instância do Express para reutilização
const server = express();

// Exportar para uso no ambiente serverless
export const createNestApp = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  return app;
};

// Bootstrap normal para desenvolvimento local
async function bootstrap() {
  const app = await createNestApp(server);
  await app.listen(process.env.PORT || 3000);
}

// Executar apenas em ambiente não-serverless
if (process.env.NODE_ENV !== 'production') {
  bootstrap().catch((err) => console.error('Bootstrap error:', err));
}

// Para a Vercel - Handler serverless
export default async (req: express.Request, res: express.Response) => {
  const app = await createNestApp(server);
  await app.init();

  // Processar a requisição
  server(req, res);
};
