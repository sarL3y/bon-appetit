'use strict';

const EDAMAM_SEARCH_URL = 'https://api.edamam.com/search';

function formatQueryParams(params) {
	const queryItems = Object.keys(params)
	.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)

	return queryItems.join('&');
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

function displayResults(responseJson) {

	$('#results-list').empty();
	$('#js-error-message').empty();
	$('.site-preview').addClass('hidden');

	if (responseJson.hits.length === 0) {
		$('#js-error-message').text(`No one wants to eat that... Try something else!`);

	} else {
		for (let i = 0; i < responseJson.hits.length; i++) {
			let ingredients = "";
			let healthInfo = "";
			let dietInfo = "";

			for (let j = 0; j < responseJson.hits[i].recipe.ingredientLines.length; j++) {
				ingredients = ingredients + `<li role="listitem">
					<div class="items">
						<p class="item">${responseJson.hits[i].recipe.ingredientLines[j]}</p>
					</div>
				</li>`
			};

			for (let j = 0; j < responseJson.hits[i].recipe.healthLabels.length; j++) {
				healthInfo = healthInfo + `<li role="listitem">
					<div class="items">
						<p class="item">${responseJson.hits[i].recipe.healthLabels[j]}</p>
					</div>
				</li>`
			};

			for (let j = 0; j < responseJson.hits[i].recipe.dietLabels.length; j++) {
				dietInfo = dietInfo + `<li role="listitem">
					<div class="items">
						<p class="item">${responseJson.hits[i].recipe.dietLabels[j]}</p>
					</div>
				</li>`
			};

			$('#results-list').append(
				`<li role="listitem">
					<div id="search-result" class="search-result">
						<a href="${responseJson.hits[i].recipe.url}" target="_blank" role="link"><img src="${responseJson.hits[i].recipe.image}" class="recipe-img" alt="Image of recipe"></a>
						<a href="${responseJson.hits[i].recipe.url}" target="_blank" role="link" class="recipe-label-a"><p class="recipe-label">${responseJson.hits[i].recipe.label}</p></a>

						<p class="recipe-source">${responseJson.hits[i].recipe.source}</p>
						
						<div class="expand-buttons">
							<button type="button" id="show-ingredients" class="show-ingredients" data-ingredients=${i}" role="button">Ingredients +</button>
							<button type="button" id="show-health-info" class="show-health-info" data-health-info=${i}" role="button">Diet Info +</button>
						</div>
					</div>

					<div class="ingredients-container">
						<section id="ingredients-${i}" class="ingredients hidden" role="region">
							<ul id="ingredients-list" class="ingredients-list" role="list">
								${ingredients}
							</ul>
						</section>
					</div>
					<div class="health-info-container">
						<section id="health-info-${i}" class="health-info hidden" role="region">
							<ul id="health-info-list" class="health-info-list" role="list">
								${healthInfo}
							</ul>
							<ul id="diet-info-list" class="diet-info-list" role="list">
								${dietInfo}
							</ul>
						</section>
					</div>
				</li>`
			);
		};
	};
 
	$('#results').removeClass('hidden');
};

function watchSearchForm() {
	$('form').submit(event => {
		event.preventDefault();
		const searchTerm = $('#js-search-term').val();
		const limit = $('#js-max-results').val();
		getRecipes(searchTerm, limit);
		$('header').css('margin-top', '2vh');
	});
};

function watchShowIngredientsButton() {
	$('#results-list').on('click', '#show-ingredients', event => {
		let recipeNum = $(event.currentTarget).data('ingredients');

		if (!$(this).find('#health-info-' + recipeNum.replace('"', '')).hasClass('hidden')) {
			$(this).find('#health-info-' + recipeNum.replace('"', '')).addClass('hidden');
		};
		
		if (!$(this).find('#ingredients-' + recipeNum.replace('"', '')).hasClass('hidden')) {
			$(this).find('#ingredients-' + recipeNum.replace('"', '')).addClass('hidden');
		} else {
			$(this).find('#ingredients-' + recipeNum.replace('"', '')).removeClass('hidden');
		};
	});
};

function watchShowHealthInfoButton() {
	$('#results-list').on('click', '#show-health-info', event => {
		let recipeNum = $(event.currentTarget).data('health-info');

		if (!$(this).find('#ingredients-' + recipeNum.replace('"', '')).hasClass('hidden')) {
			$(this).find('#ingredients-' + recipeNum.replace('"', '')).addClass('hidden');
		};

		if (!$(this).find('#health-info-' + recipeNum.replace('"', '')).hasClass('hidden')) {
			$(this).find('#health-info-' + recipeNum.replace('"', '')).addClass('hidden');
		} else {
			$(this).find('#health-info-' + recipeNum.replace('"', '')).removeClass('hidden');
		};
	});
};

function watchHomeButton() {
	$('h1').on('click', event => {
		location.reload();
	});
};

$(watchHomeButton);
$(watchShowIngredientsButton);
$(watchShowHealthInfoButton);
$(watchSearchForm);
console.log('app loaded');

