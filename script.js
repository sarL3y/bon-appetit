'use strict';

const { getRecipes } = require('./utils');

const { EDAMAM_API_KEY, EDAMAM_APP_ID } = require('./config/index.js');
const EDAMAM_SEARCH_URL = 'https://api.edamam.com/search';

function watchSearchForm() {
	// $('form').submit(event => {
	// 	event.preventDefault();
	// 	const searchTerm = $('#js-search-term').val();
	// 	const limit = $('#js-max-results').val();
	// 	getRecipes(searchTerm, limit, EDAMAM_API_KEY, EDAMAM_APP_ID, EDAMAM_SEARCH_URL);
	// 	$('header').css('margin-top', '2vh');
	// }); 
	getRecipes('chicken', 10, EDAMAM_API_KEY, EDAMAM_APP_ID, EDAMAM_SEARCH_URL);
	console.log('watchsearchform ran');
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

// $(watchHomeButton);
// $(watchShowIngredientsButton);
// $(watchShowHealthInfoButton);
// $(watchSearchForm);
console.log('script.js ran');

module.exports = { watchSearchForm };
