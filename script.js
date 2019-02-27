'use strict';

const EDAMAM_SEARCH_URL = 'https://api.edamam.com/search';

// const AMAZON_API_KEY = '';
// const AMAZON_SEARCH_URL = '';

function formatQueryParams(params) {
	const queryItems = Object.keys(params)
	.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)

	return queryItems.join('&');
}

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

function displayResults(responseJson) {
	console.log(responseJson);

	$('#results-list').empty();
	console.log('emptying list');

	// FOR LOOP METHOD //
	for (let i = 0; i < responseJson.hits.length; i++) {
		for (let j = 0; j < responseJson.hits[i].recipe.ingredientLines.length; j++) {
			$('#ingredients-list').append(
			`<li>
				<div class="items">
					<p class="item">${responseJson.hits[i].recipe.ingredientLines[j]}</p>
				</div>
			</li>`
			);
		};

		$('#results-list').append(
			`<li>
				<div id="search-result" class="search-result">
					<h3><a href="${responseJson.hits[i].recipe.url}">${responseJson.hits[i].recipe.label}</a></h3>
					<img src="${responseJson.hits[i].recipe.image}" class="recipe-img">
					<button type="button" id="show-ingredients" class="show-ingredients">Show Ingredients</button>

					<section id="ingredients" class="hidden">
						<h4>Ingredients</h4>
						<ul id="ingredients-list" class="ingredients-list">

						</ul>
					</section>	
				</div>
			</li>`
		);
		/* for (let j = 0; j < responseJson.hits[i].recipe.ingredientLines.length; j++) {
		$('#results-list').find('#ingredients-list').append(
			`<li>
				<div class="items">
					<p class="item">${responseJson.hits[i].recipe.ingredientLines[j]}</p>
				</div>
			</li>`
		);*/ 
	};
 

	// FOREACH METHOD //
	/* responseJson.hits.forEach(key => {
		const recipe = key.recipe;
		const image = key.recipe.image;
		const url = key.recipe.url;
		const label = key.recipe.label;
		const ingredient = key.recipe.ingredientLines.map(key => {
			return key;
		});
		console.log(ingredient);
		
		$('#results-list').append(
			`<li>
				<div class="search-result">
					<img src="${image}">
					<h3><a href="${url}">${label}</a></h3>

					<button type="button" id="show-ingredients" class="show-ingredients">Show More</button>

					<section id="ingredients" class="hidden ">
						<h4>Ingredients</h4>
						<ul id="ingredients-list" class="ingredients-list">
						
						</ul>
					</section>	
				</div>
			</li>`
		);

		$('#results-list').find('#ingredients-list').append(
			`<li>
				<div class="items">
					<p class="item">${ingredient}</p>
				</div>
			</li>`
		);		
	}); 
	*/

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
		console.log('clicked + button');
		$(this).find('#ingredients').removeClass('hidden');
	});
	
}

$(watchShowIngredientsButton);
$(watchSearchForm);
console.log('app loaded');

