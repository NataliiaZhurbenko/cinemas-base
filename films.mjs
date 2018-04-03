import mongoose from 'mongoose';
import {Film} from './models.mjs';

export default class Films {
	constructor(data){
		this._data = data;
	}
	
	save() {
		let film = new Film({
			_id: new mongoose.Types.ObjectId(),
			name: this._data.name,
			year: this._data.year,
			duration: this._data.duration
		});
		
		film.save((err) => {
			if (err) {
				console.log(err);
			} else {
				console.log("Successfully saved in DB")
			}
		});
	}
	
	into(res) {
		Film.find({}, (err, films) => {
			if (err) {
				res.send('No data found');
			}
			else {
				res.json(films);
			}
		});
	}
}