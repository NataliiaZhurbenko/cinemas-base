import express from 'express';
import bodyParser from 'body-parser';
import Connection from './connection.mjs';
import Films from './films.mjs';
import Halls from './halls.mjs';
import Cinemas from './cinemas.mjs';
import Shows from './shows.mjs';

let app = express();
new Connection();

// create application/json parser
let jsonParser = bodyParser.json();

app.get('/films', (req, res)  => {
	let films = new Films( );
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

app.get('/halls', (req, res)  => {
	let halls = new Halls( );
	halls.into(res);
});

app.post('/halls', jsonParser, (req, res) => {
	if (!req.body) {
		return res.sendStatus(400)
	}
	let halls = new Halls(req.body);
	halls.save();
	res.end();
})

app.get('/cinemas', (req, res)  => {
	let cinemas = new Cinemas( );
	cinemas.into(res);
});

app.post('/cinemas', jsonParser, (req, res) => {
	if (!req.body) {
		return res.sendStatus(400)
	}
	let cinemas = new Cinemas(req.body);
	cinemas.save();
	res.end();
})
app.get('/shows', (req, res)  => {
	let shows = new Shows( );
	shows.into(res);
});

app.post('/shows', jsonParser, (req, res) => {
	if (!req.body) {
		return res.sendStatus(400)
	}
	let shows = new Shows(req.body);
	shows.save();
	res.end();
})

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});

