import express from 'express';
import bodyParser from 'body-parser';
import Connection from './connection.mjs';
import Films from './films.mjs';

let app = express();
new Connection();

// create application/json parser
let jsonParser = bodyParser.json();

app.get('/films', (req, res)  => {
	let films = new Films();
	films.into(res);
});

app.post('/films', jsonParser, (req, res) => {
	if (!req.body) {
		return res.sendStatus(400)
	}
	let films = new Films(req.body);
	films.save();
	res.end();
})

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});

