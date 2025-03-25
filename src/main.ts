// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Use a porta fornecida pelo ambiente ou 3000 como fallback
  const port = process.env.PORT || 3000;

  // Log para debug
  console.log(`Application is running on port: ${port}`);

  // Vincular à porta correta e ao host 0.0.0.0 para permitir conexões externas
  await app.listen(port, '0.0.0.0');
}
bootstrap().catch((err) => console.error('Error during bootstrap:', err));
