const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const path = require('path');

app.use(passport.initialize());

app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '/public/dist/public/')));
require('server/routes')(app);

app.listen(8000, ()=>{
    console.log("Your server is listening on port 8000.")
})