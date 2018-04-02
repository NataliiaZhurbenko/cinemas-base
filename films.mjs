import mongoose from 'mongoose';
import {FilmsSchema} from './schemas.mjs';

export default class Films {
	constructor(data){
		this._data = data;
		try {
			this.Film = mongoose.model('Film');
		}
		catch (err) {
		// The `Film` model doesn't exist, so need to create it
		this.Film = mongoose.model('Film', FilmsSchema);
		}
	}
	
	save() {
		let film = new this.Film({
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
		this.Film.find({}, (err, films) => {
			if (err) {
				res.send('No data found');
			}
			else {
				res.json(films);
			}
		});
	}
}