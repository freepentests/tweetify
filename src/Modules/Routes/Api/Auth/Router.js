import CreateAccountRoute from './CreateAccountRoute.js';
import LoginRoute from './LoginRoute.js';

import express from 'express';

export default class CommunitiesRouter {
	constructor() {
		this.router = express.Router();
		this.setUpRoutes();
	}

	setUpRoutes() {
		this.router.post('/createAccount', CreateAccountRoute.onPost.bind(this));
		this.router.post('/login', LoginRoute.onPost.bind(this));
	}
}

