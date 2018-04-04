import mongoose from 'mongoose';
import {Cinema} from './models.mjs';

export default class Cinemas {
	constructor(res, data=null){
		this._data = data;
		this._res = res;
		
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
				this._res.send("Error occured");
				// TODO: Need to send error to log
			} else {
				this._res.send("Cinema successfully saved in DB")
			}
		});
	}
	
	fetch() {
		Cinema.find({}).select('-__v').populate('halls', 'name').exec((err, cinemas) => {
			if (err) {
				this._res.send('No data found');
			}
			else {
				this._res.json(cinemas);
			}
		});
	}
}