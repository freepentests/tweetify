import ExploreRoute from './ExploreRoute.js';
import CreateRoute from './CreateRoute.js';

import express from 'express';

export default class CommunitiesRouter {
	constructor() {
		this.router = express.Router();
		this.setUpRoutes();
	}

	setUpRoutes() {
		this.router.get('/explore', ExploreRoute.onGet.bind(this));
		this.router.get('/create', CreateRoute.onGet.bind(this));
	}
}

