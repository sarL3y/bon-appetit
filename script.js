'use strict';

const EDAMAM_SEARCH_URL = 'https://api.edamam.com/search';

const apiKey = config.apiKey;
// const AMAZON_API_KEY = '';
// const AMAZON_SEARCH_URL = '';

function formatQueryParams(params) {
	const queryItems = Object.keys(params)
	.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)

	return queryItems.join('&');
}

function getRecipes(query, limit=5) {
	const params = {
		'q': query,
		'app_id': EDAMAM_APP_ID,
		'app_key': apiKey,
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

function displayResults(responseJson) {
	console.log(responseJson);

	$('#results-list').empty();
	console.log('emptying list');

	for (let i = 0; i < responseJson.hits.length; i++) {
		let ingredients = "";
		let healthInfo = "";

		for (let j = 0; j < responseJson.hits[i].recipe.ingredientLines.length; j++) {
			ingredients = ingredients + `<li>
				<div class="items">
					<p class="item">${responseJson.hits[i].recipe.ingredientLines[j]}</p>
				</div>
			</li>`
			console.log('Printing Ingredients');
		};

		for (let j = 0; j < responseJson.hits[i].recipe.healthLabels.length; j++) {
			healthInfo = healthInfo + `<li>
				<div class="items">
					<p class="item">${responseJson.hits[i].recipe.healthLabels[j]}</p>
				</div>
			</li>`
			console.log('Printing Diet Info');
		};


		$('#results-list').append(
			`<li>
				<div id="search-result" class="search-result">
					<a href="${responseJson.hits[i].recipe.url}"><img src="${responseJson.hits[i].recipe.image}" class="recipe-img"></a>
					<a href="${responseJson.hits[i].recipe.url}" class="recipe-label-a"><p class="recipe-label">${responseJson.hits[i].recipe.label}</p></a>
					<p class="recipe-source">${responseJson.hits[i].recipe.source}</span>
					
					<div class="expand-buttons">
						<button type="button" id="show-ingredients" class="show-ingredients" data-ingredients=${i}">Ingredients</button>
						<button type="button" id="show-health-info" class="show-health-info" data-health-info=${i}">Health Info</button>
					</div>
				</div>
				<div class="ingredients-container">
					<section id="ingredients-${i}" class="ingredients hidden">
						<h4>Ingredients</h4>
						<ul id="ingredients-list" class="ingredients-list">
							${ingredients}
						</ul>
					</section>
				</div>
				<div class="health-info-container">
					<section id="health-info-${i}" class="health-info hidden">
						<h4>Health Info</h4>
						<ul id="health-info-list" class="health-info-list">
							${healthInfo}
						</ul>
					</section>
				</div>
			</li>`
		);
	};
 
	$('#results').removeClass('hidden');
	console.log('showing stuff');
};

function watchSearchForm() {
	$('form').submit(event => {
		event.preventDefault();
		const searchTerm = $('#js-search-term').val();
		const limit = $('#js-max-results').val();
		getRecipes(searchTerm, limit);
	});
}

function watchShowIngredientsButton() {
	$('#results-list').on('click', '#show-ingredients', event => {
		let recipeNum = $(event.currentTarget).data('ingredients');
		console.log(recipeNum);
		$(this).find('#ingredients-' + recipeNum.replace('"', '')).removeClass('hidden');
	});
}

function watchShowHealthInfoButton() {
	$('#results-list').on('click', '#show-health-info', event => {
		let recipeNum = $(event.currentTarget).data('health-info');
		console.log(recipeNum);
		$(this).find('#health-info-' + recipeNum.replace('"', '')).removeClass('hidden');
	});
}

$(watchShowIngredientsButton);
$(watchShowHealthInfoButton);
$(watchSearchForm);
console.log('app loaded');

