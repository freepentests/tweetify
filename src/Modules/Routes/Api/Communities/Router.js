import CreateCommunityRoute from './CreateCommunityRoute.js';
import SearchCommunitiesRoute from './SearchCommunitiesRoute.js';
import SearchRecommendationsRoute from './SearchRecommendationsRoute.js';

import express from 'express';

export default class CommunitiesRouter {
	constructor() {
		this.router = express.Router();
		this.setUpRoutes();
	}

	setUpRoutes() {
		this.router.post('/create', CreateCommunityRoute.onPost.bind(this));
		this.router.get('/search', SearchCommunitiesRoute.onGet.bind(this));
		this.router.get('/searchRecommendations', SearchRecommendationsRoute.onGet.bind(this));
	}
}

