import { debounce } from './Debounce.js';

export default class SearchRecommendations {
	static clearRecommendationsList() {
		const recommendationsElement = document.querySelector('.searchRecommendations');
		return recommendationsElement.innerHTML = '';
	}

	static onNoRecommendations() {
		const recommendationsElement = document.querySelector('.searchRecommendations');

		const result = document.createElement('div');
		result.innerText = 'No results found';
		recommendationsElement.appendChild(result);
	}

	static getSearchRecommendations = debounce(async (query) => {
		if (!query) {
			return SearchRecommendations.clearRecommendationsList();
		}

		const response = await fetch(`/api/communities/searchRecommendations?query=${query}`);
		const json = await response.json();

		SearchRecommendations.renderSearchRecommendations(json.response);
	}, 500);

	static renderSearchRecommendations(recommendations) {
		SearchRecommendations.clearRecommendationsList();

		if (recommendations.length === 0) return SearchRecommendations.onNoRecommendations();

		const recommendationsElement = document.querySelector('.searchRecommendations');
		recommendations.forEach((recommendation) => {
			const result = document.createElement('div');
			result.innerText = recommendation;
			recommendationsElement.appendChild(result);
		});
	}
}

