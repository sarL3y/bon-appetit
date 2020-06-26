const fetch = require('node-fetch');
const { displayResults } = require('./displayResults');
const { formatQueryParams } = require('./formatParams');

function getRecipes(query, limit=10, EDAMAM_API_KEY, EDAMAM_APP_ID, EDAMAM_SEARCH_URL) {
	const params = {
		'q': query,
		'app_id': EDAMAM_APP_ID,
		'app_key': EDAMAM_API_KEY,
		'to': limit
	};

	const queryString = formatQueryParams(params);
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
			console.log(err);
			$('#js-error-message').text(`Search limit exceeded: 5 searches per minute. ${err.message}.`);
		});
};

module.exports = { getRecipes };