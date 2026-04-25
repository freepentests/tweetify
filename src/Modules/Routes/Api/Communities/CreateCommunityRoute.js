import CommunityBuilder from '../../../Builders/Community.js';
import ApiResponseBuilder from '../../../Builders/ApiResponse.js';

import * as fs from 'fs';

export default class CreateCommunityRoute {
	static generateRandomInviteCode() {
		return crypto.randomUUID();
	}

	static createCommunity({name, description, isPublic}) {
		const communities = JSON.parse(fs.readFileSync('data/communities.json', 'utf-8'));

		const community = new CommunityBuilder()
			.setName(name)
			.setDescription(description)
			.setIsPublic(isPublic)
			.setInviteCode(CreateCommunityRoute.generateRandomInviteCode())
			.setMemberCount(0);

		communities.push(community);

		fs.writeFileSync('data/communities.json', JSON.stringify(communities));
	}

	static onPost(req, res) {
		const name = req.body.name;
		const description = req.body.description;
		const isPublic = req.body.isPublic;

		const apiResponse = new ApiResponseBuilder();

		if (!name || !description || isPublic === undefined) {
			apiResponse.setSuccess(false).setResponse('Not enough arguments provided to satisfy this request.');
			return res.status(400).json(apiResponse);
		}

		CreateCommunityRoute.createCommunity(req.body);

		apiResponse.setSuccess(true).setResponse('Successfully created community!');
		res.json(apiResponse);
	}
}

