import mongoose from 'mongoose';
import {HallsSchema} from './schemas.mjs';

export default class Halls {
	constructor(data=null){
		this._data = data;
		try {
			this.Hall = mongoose.model('Hall');
		}
		catch (err) {
		// The `Hall` model doesn't exist, so need to create it
		this.Hall = mongoose.model('Hall', HallsSchema);
		}
	}
	
	save() {
		let hall = new this.Hall({
			_id: new mongoose.Types.ObjectId(),
			name: this._data.name,
			capacity: this._data.capacity
		});
		
		hall.save((err) => {
			if (err) {
				console.log(err);
			} else {
				console.log("Successfully saved in DB")
			}
		});
	}
	
	into(res) {
		this.Hall.find({}, (err, halls) => {
			if (err) {
				res.send('No data found');
			}
			else {
				res.json(halls);
			}
		});
	}
}