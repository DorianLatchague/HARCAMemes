const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
require(path.resolve(__dirname, 'api/routes.js'))(app);
app.get('/', (req,res) => {
    res.render('index');
});
app.listen(8000, () => {
    console.log("Your server is listening on port 8000.")
})