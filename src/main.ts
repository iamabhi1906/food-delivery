import { NestFactory } from "@nestjs/core";
import { ConsoleLogger, Logger, ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module.js";

async function bootstrap() {
	const logger = new Logger("Bootstrap");
	const app = await NestFactory.create(AppModule, {
		forceCloseConnections: true,
		logger: new ConsoleLogger({ colors: true, prefix: "food-delivery" }),
	});
	app.setGlobalPrefix("api");
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			forbidNonWhitelisted: true,
		}),
	);

	const port = process.env.PORT || 3000;
	await app.listen(port);
	logger.log(`Modular Monolith running on: http://localhost:${port}/api`);
}

bootstrap();
