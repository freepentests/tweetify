import ApiResponseBuilder from '../../../Builders/ApiResponse.js';

import * as fs from 'fs';

export default class SearchCommunitiesRoute {
	static searchCommunities(query) {
		if ([...query].length <= 3 || [...query].length > 35) throw new Error('Your query must be more than 3 characters in length and less than 35 characters in length.');

		const communities = JSON.parse(fs.readFileSync('data/communities.json', 'utf-8'));

		const matchingResults = communities.filter((community) => {
			if (!community.isPublic) return false;
			
			const isNameMatched = community.name.toLowerCase().includes(query.toLowerCase());
			const isDescriptionMatched = community.description.toLowerCase().includes(query.toLowerCase());
			const isQueryMatched = isNameMatched || isDescriptionMatched;

			return isQueryMatched;
		});

		return {
			results: matchingResults,
			numResults: matchingResults.length
		};
	}

	static onGet(req, res) {
		const query = req.query.query;

		const apiResponse = new ApiResponseBuilder();

		if (!query) {
			apiResponse.setSuccess(false).setResponse('Not enough arguments provided to satisfy this request.');
			return res.status(400).json(apiResponse);
		}

		try {
			const searchResult = SearchCommunitiesRoute.searchCommunities(query);
			apiResponse.setSuccess(true).setResponse(searchResult);
			res.json(apiResponse);
		} catch(error) {
			apiResponse.setSuccess(false).setResponse(error.message);
			res.status(500).json(apiResponse);
		}
	}
}

