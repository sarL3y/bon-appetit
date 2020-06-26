require('dotenv').config();

const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;	
const EDAMAM_API_KEY = process.env.EDAMAM_API_KEY;
const PORT = 8080;

module.exports = { EDAMAM_APP_ID, EDAMAM_API_KEY, PORT };