import CreateCommunityRoute from './CreateCommunityRoute.js';

import express from 'express';

export default class CommunitiesRouter {
	constructor() {
		this.router = express.Router();
		this.setUpRoutes();
	}

	setUpRoutes() {
		this.router.post('/create', CreateCommunityRoute.onPost.bind(this));
	}
}

