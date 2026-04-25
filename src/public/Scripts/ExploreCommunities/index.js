import SearchRecommendations from './SearchRecommendations.js';
import Search from './Search.js';

document.querySelector('.query').addEventListener('input', (e) => {
	SearchRecommendations.getSearchRecommendations(e.target.value);
});

document.querySelector('.searchRecommendations').addEventListener('click', (e) => {
	document.querySelector('.query').value = e.target.innerText;
	SearchRecommendations.clearRecommendationsList();
});

document.querySelector('.searchButton').addEventListener('click', (e) => {
	const searchQuery = document.querySelector('.query').value;
	Search.search(searchQuery);
});

