import mongoose from 'mongoose';
import {Film} from './models.mjs';

export default class Films {
	constructor(res, data){
		this._data = data;
		this._res = res;
		
	}
	
	save() {
		let film = new Film({
			_id: new mongoose.Types.ObjectId(),
			name: this._data.name,
			year: this._data.year,
			duration: this._data.duration,
			shows: []
		});
		
		film.save((err) => {
			if (err) {
				this._res.send("Error occured");
				// TODO: Need to send error to log
			} else {
				this._res.send("Cinema successfully saved in DB")
			}
		});
	}
	
	into() {
		Film.find({}).select('-__v').populate('shows', 'name').exec((err, films) => {
			if (err) {
				this._res.send('No data found');
			}
			else {
				this._res.json(films);
			}
		});
	}
}