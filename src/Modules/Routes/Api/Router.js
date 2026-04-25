import CommunitiesRouter from './Communities/Router.js';

import express from 'express';

export default class ApiRouter {
	constructor() {
		this.router = express.Router();
		this.setUpMiddleware();
		this.setUpRoutes();
	}

	setUpRoutes() {
		const communitiesRouter = new CommunitiesRouter();

		this.router.use('/communities', communitiesRouter.router);
	}

	setUpMiddleware() {
		this.router.use(express.json());
	}
}

