import mongoose from 'mongoose';
import {ShowsSchema} from './schemas.mjs';

export default class Shows {
	constructor(data=null){
		this._data = data;
		try {
			this.Show = mongoose.model('Show');
		}
		catch (err) {
		// The `Show` model doesn't exist, so need to create it
		this.Show = mongoose.model('Show', ShowsSchema);
		}
	}
	
	save() {
		let show = new this.Show({
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
		this.Show.find({}, (err, shows) => {
			if (err) {
				res.send('No data found');
			}
			else {
				res.json(shows);
			}
		});
	}
}