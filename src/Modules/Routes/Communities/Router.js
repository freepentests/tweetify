import ExploreRoute from './ExploreRoute.js';

import express from 'express';

export default class CommunitiesRouter {
	constructor() {
		this.router = express.Router();
		this.setUpRoutes();
	}

	setUpRoutes() {
		this.router.get('/', ExploreRoute.onGet.bind(this));
		this.router.get('/explore', ExploreRoute.onGet.bind(this));
	}
}

