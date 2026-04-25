import CommunitiesRouter from './Communities/Router.js';
import AuthRouter from './Auth/Router.js';

import express from 'express';

export default class ApiRouter {
	constructor() {
		this.router = express.Router();
		this.setUpMiddleware();
		this.setUpRoutes();
	}

	setUpRoutes() {
		const communitiesRouter = new CommunitiesRouter();
		const authRouter = new AuthRouter();

		this.router.use('/communities', communitiesRouter.router);
		this.router.use('/auth', authRouter.router);
	}

	setUpMiddleware() {
		this.router.use(express.json());
	}
}

