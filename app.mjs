import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
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
	let films = new Films(res);
	films.into();
});

app.post('/films', jsonParser, (req, res) => {
	if (!req.body) {
		return res.sendStatus(400)
	}
	let films = new Films(req.body);
	films.save();
	res.end();
})

app.get('/halls', (req, res) => {
	let halls = new Halls(res);
	halls.filter(req.query);
});

app.post('/halls', jsonParser, (req, res) => {
	if (!req.body) {
		return res.sendStatus(400)
	}
	let halls = new Halls(res, req.body);
	halls.save();
})

app.get('/cinemas', (req, res)  => {
	let cinemas = new Cinemas(res);
	cinemas.into();
});

app.post('/cinemas', jsonParser, (req, res) => {
	if (!req.body) {
		return res.sendStatus(400)
	}
	let cinemas = new Cinemas(res, req.body);
	cinemas.save();
})

app.get('/shows', (req, res)  => {
	let shows = new Shows(res);
	shows.into();
});


app.post('/shows', jsonParser, (req, res) => {
	if (!req.body) {
		return res.sendStatus(400)
	}
	let shows = new Shows(res, req.body);
	shows.save();
})

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});

