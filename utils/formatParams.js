function formatQueryParams(params) {
	const queryItems = Object.keys(params)
	.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)

	return queryItems.join('&');
};

module.exports = { formatQueryParams };