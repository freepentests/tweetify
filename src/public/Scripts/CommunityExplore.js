const debounce = (func, ms) => {
	let timeout;
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), ms);
	};
};

const getSearchRecommendations = debounce(async (query) => {
	if (!query) {
		const recommendationsElement = document.querySelector('.searchRecommendations');
		return recommendationsElement.innerHTML = '';
	}

	const response = await fetch(`/api/communities/searchRecommendations?query=${query}`);
	const json = await response.json();

	renderSearchRecommendations(json.response);
}, 500);

const renderSearchRecommendations = (recommendations) => {
	const recommendationsElement = document.querySelector('.searchRecommendations');
	recommendationsElement.innerHTML = '';

	if (recommendations.length === 0) {
		const result = document.createElement('div');
		result.innerText = 'No results found';
		recommendationsElement.appendChild(result);
	}

	recommendations.forEach((recommendation) => {
		const result = document.createElement('div');
		result.innerText = recommendation;
		recommendationsElement.appendChild(result);
	});
};

document.querySelector('.query').addEventListener('input', (e) => {
	getSearchRecommendations(e.target.value);
});

