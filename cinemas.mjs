import mongoose from 'mongoose';
import {Cinema} from './models.mjs';

export default class Cinemas {
	constructor(data=null){
		this._data = data;
	}

	
	save() {
		let cinema = new Cinema({
			_id: new mongoose.Types.ObjectId(),
			name: this._data.name,
			city: this._data.city,
			halls: []
		});
		
		cinema.save((err) => {
			if (err) {
				console.log(err);
			} else {
				console.log("Cinema Successfully saved in DB")
			}
		});
	}
	
	into(res) {
		Cinema.find({}).populate('halls').exec((err, cinemas) => {
			if (err) {
				res.send('No data found');
			}
			else {
				res.json(cinemas);
			}
		});
	}
}