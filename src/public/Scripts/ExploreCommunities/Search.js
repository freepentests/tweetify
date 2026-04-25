import SearchRecommendations from './SearchRecommendations.js';

export default class Search {
	static clearSearchResults() {
		document.querySelector('.searchResults').innerHTML = '';
	}

	static renderSearchResults(response) {
		document.querySelector('.message').innerText = `Results found: ${response.numResults}`;
		Search.clearSearchResults();

		response.results.forEach((result) => {
			const communityElement = document.createElement('div');
			const titleElement = document.createElement('h2');
			const descriptionElement = document.createElement('p');
			const joinButtonElement = document.createElement('button');

			titleElement.innerText = result.name;
			descriptionElement.innerText = result.description;

			joinButtonElement.innerText = 'Join';
			joinButtonElement.classList.add('joinButton');
			joinButtonElement.setAttribute('invite-code', result.inviteCode);

			communityElement.appendChild(titleElement);
			communityElement.appendChild(descriptionElement);
			communityElement.appendChild(joinButtonElement);

			document.querySelector('.searchResults').appendChild(communityElement);
		});
	}

	static async search(query) {
		SearchRecommendations.clearRecommendationsList();

		const response = await fetch(`/api/communities/search?query=${query}`);
		const json = await response.json();

		if (!json.success) {
			return document.querySelector('.message').innerText = `Error: ${json.response}`;
		}

		return Search.renderSearchResults(json.response);
	}
}

