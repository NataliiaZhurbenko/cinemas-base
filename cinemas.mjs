import mongoose from 'mongoose';
import {CinemasSchema} from './schemas.mjs';

export default class Cinemas {
	constructor(data=null){
		this._data = data;
		try {
			this.Cinema = mongoose.model('Cinema');
		}
		catch (err) {
		// The `Cinema` model doesn't exist, so need to create it
		this.Cinema = mongoose.model('Cinema', CinemasSchema);
		}
	}
	
	save() {
		let cinema = new this.Cinema({
			_id: new mongoose.Types.ObjectId(),
			name: this._data.name,
			city: this._data.city
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
		this.Hall.find({}).populate('cinema').exec((err, halls)
		this.Cinema.find({}).populate('halls') exec((err, cinemas) => {
			if (err) {
				res.send('No data found');
			}
			else {
				res.json(cinemas);
			}
		});
	}
}