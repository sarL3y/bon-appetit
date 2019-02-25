'use strict';

const EDAMAM_SEARCH_URL = 'https://api.edamam.com/search';

const AMAZON_API_KEY = '';
const AMAZON_SEARCH_URL = '';


function formatQueryParams(params) {
	const queryItems = Object.keys(params)
	.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
	return queryItems.join('&');
}

function displayResults(responseJson) {
	console.log(responseJson);
	$('#results-list').empty();
	console.log('emptying list');
	for (let i = 0; i < responseJson.hits.length; i++){
		console.log('for loop working');
		$('#results-list').append(
			`<li><h3><a href="${responseJson.hits[i].recipe.url}">${responseJson.hits[i].recipe.label}</a></h3>
			<img src="${responseJson.hits[i].recipe.image}">
			</li>`
		);
		console.log('appending stuff');
	};

	$('#results').removeClass('hidden');
	console.log('showing stuff');
};

function getRecipes(query, limit=10) {
	const params = {
		'q': query,
		'app_id': EDAMAM_APP_ID,
		'app_key': EDAMAM_API_KEY,
		'to': limit
	};
	const queryString = formatQueryParams(params)
	const url = EDAMAM_SEARCH_URL + '?' + queryString;

	console.log(url);

	fetch(url)
		.then(response => {
			if (response.ok) {
			return response.json();
			}
			throw new Error(response.statusText);
		})
		.then(responseJson => displayResults(responseJson))
		.catch(err => {
			$('#js-error-message').text(`Something went wrong: ${err.message}`);
		});
}

function watchForm() {
	$('form').submit(event => {
		event.preventDefault();
		const searchTerm = $('#js-search-term').val();
		const limit = $('#js-max-results').val();
		getRecipes(searchTerm, limit);
	});
}

$(watchForm);
console.log('app loaded');

