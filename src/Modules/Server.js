import HomeRoute from './Routes/HomeRoute.js';
import express from 'express';

export class Server {
	static instance;

	constructor(port, environment) {
		if (Server.instance) return Server.instance;

		this.port = port;
		this.environment = environment || 'development';

		this.app = null;

		Server.instance = this;
	}

	start(callback) {
		this.app = new express();
		this.setUpMiddleware();
		this.setUpRoutes();
		this.app.listen(this.port, callback);
	}

	setUpMiddleware() {
		this.app.use('/static', express.static('public'));
	}

	setUpRoutes() {
		this.app.get('/', HomeRoute.onGet.bind(this));
	}
}

