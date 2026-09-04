import { execSync } from "node:child_process";

const [, , command, service, name] = process.argv;

const dataSources = {
	users: {
		compiled: "dist/users/database/data-source.js",
		migrations: "src/users/database/migrations",
	},
	orders: {
		compiled: "dist/orders/database/data-source.js",
		migrations: "src/orders/database/migrations",
	},
	notifications: {
		compiled: "dist/notifications/database/data-source.js",
		migrations: "src/notifications/database/migrations",
	},
} as const;

type Service = keyof typeof dataSources;

if (!service || !(service in dataSources)) {
	throw new Error(`Invalid service "${service}". Available services: ${Object.keys(dataSources).join(", ")}`);
}

const config = dataSources[service as Service];

function run(command: string) {
	console.log(`\n> ${command}\n`);

	execSync(command, {
		stdio: "inherit",
	});
}

switch (command) {
	case "create": {
		if (!name) {
			throw new Error("Migration name is required.\n" + "Example: pnpm migration:create users CreateUser");
		}

		run(`pnpm typeorm:ts migration:create ${config.migrations}/${name}`);

		break;
	}

	case "run": {
		run(`pnpm typeorm:js migration:run -d ${config.compiled}`);

		break;
	}

	case "revert": {
		run(`pnpm typeorm:js migration:revert -d ${config.compiled}`);

		break;
	}

	default:
		throw new Error(`Invalid command "${command}". Available commands: create, run, revert`);
}
