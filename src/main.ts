// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração de CORS sem o pacote extra
  app.enableCors({
    origin: [
      'https://frontend-techket.vercel.app',
      'http://localhost:3001',
      // Adicione outros domínios conforme necessário
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap().catch((err) => console.error('Error during bootstrap:', err));
