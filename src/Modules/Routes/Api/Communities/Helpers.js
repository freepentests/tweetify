import * as fs from 'fs';

export default class Helpers {
	static findCommunitiesMatchingQuery(query) {
		const communities = JSON.parse(fs.readFileSync('data/communities.json', 'utf-8'));

		const matchingCommunities = communities.filter((community) => {
			if (!community.isPublic) return false;
	
			const isNameMatched = community.name.toLowerCase().includes(query.toLowerCase());
			const isDescriptionMatched = community.description.toLowerCase().includes(query.toLowerCase());
			const isQueryMatched = isNameMatched || isDescriptionMatched;
	
			return isQueryMatched;
		});
	
		return matchingCommunities;
	};
}	
