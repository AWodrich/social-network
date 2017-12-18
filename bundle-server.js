const express = require('express');
const app = express();

app.use(require('./build.js'));

app.listen(8082, () => console.log(`Ready to compile and serve bundle.js`));
