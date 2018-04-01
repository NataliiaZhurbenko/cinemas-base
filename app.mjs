import express from 'express';
import bodyParser from 'body-parser';

let app = express();

// create application/json parser
let jsonParser = bodyParser.json();

app.get('/', (req, res)  => {
	res.send('Hello World!');
});

app.post('/films', jsonParser, (req, res) => {
	if (!req.body) {
		return res.sendStatus(400)
	}
	console.log(req.body);
	res.end();
})

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});

