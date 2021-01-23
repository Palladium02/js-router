const express = require('express');

const app = express();

app.use( '/js', express.static( __dirname + '/js' ));
app.use('/css', express.static(__dirname + '/css'));

app.get('/*', (req, res) => {
    res.sendFile('test.html', { root: __dirname });
});

app.listen(80, () => {
    console.log('Server started');
});