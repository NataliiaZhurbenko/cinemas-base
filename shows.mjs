import mongoose from 'mongoose';
import {Show} from './models.mjs';

export default class Shows {
	constructor(data=null){
		this._data = data;
	}
	
	save() {
		let show = new Show({
			_id: new mongoose.Types.ObjectId(),
			startAt: Date.parse(this._data.startAt)
		});
		
		show.save((err) => {
			if (err) {
				console.log(err);
			} else {
				console.log("Show Successfully saved in DB")
			}
		});
	}
	
	into(res) {
		Show.find({}, (err, shows) => {
			if (err) {
				res.send('No data found');
			}
			else {
				res.json(shows);
			}
		});
	}
}