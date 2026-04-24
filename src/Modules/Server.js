import HomeRoute from './Routes/HomeRoute.js';
import express from 'express';

export class Server {
	constructor(port, environment) {
		this.port = port;
		this.environment = environment || 'development';
		this.app = null;
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
		this.app.get('/', HomeRoute.onGet);
	}
}

