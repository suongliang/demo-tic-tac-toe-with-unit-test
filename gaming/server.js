const path = require('path');
const express = require('express');
const favicon = require('express-favicon');
const port = process.env.PORT || 8080;
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(__dirname  + '/build'));
app.get('/*', function(req, res){
    return res.sendFile(path.join(__dirname, '/build', 'index.html'))
});
app.listen(port);