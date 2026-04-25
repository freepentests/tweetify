import ApiResponseBuilder from '../../../Builders/ApiResponse.js';
import Helpers from './Helpers.js';

export default class SearchCommunitiesRoute {
	static searchCommunities(query) {
		if ([...query].length <= 3 || [...query].length > 35) return []

		const matchingCommunities = Helpers.findCommunitiesMatchingQuery(query);
		const matchingCommunityNames = matchingCommunities.map((community) => community.name);

		return matchingCommunityNames.slice(0, 10);
	}

	static onGet(req, res) {
		const query = req.query.query;

		const apiResponse = new ApiResponseBuilder();

		if (query === undefined) {
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

