const express = require('express');
const app = express();
const { PORT } = require('./config/index');

const router = require('./routers/index');

app.use('/getrecipes', router);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});