import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'error'],
  });
  await app.listen(AppModule.port, () => {
    console.log(`Server has been started at ${AppModule.port} port ...`);
  });
}
bootstrap();
