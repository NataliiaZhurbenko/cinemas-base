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

		try {
			this.Cinema = mongoose.model('Cinema');
		}
		catch (err) {
			// The `Cinema` model doesn't exist, so need to create it
			this.Cinema = mongoose.model('Cinema', CinemasSchema);
		}
	}
	
	save() {
		let hall = new this.Hall({
			_id: new mongoose.Types.ObjectId(),
			name: this._data.name,
			capacity: this._data.capacity,
			cinema: this._data.cinema
		});
		
		hall.save((err) => {
			if (err) {
				console.log(err);
			} else {
				this.Cinema.findById(this._data.cinema, (err, cinema) => {
					cinema.halls.push(hall._id);
					cinema.save();
				});
			}
		});
	}
	
	into(res) {
		this.Hall.find({}).populate('cinema').exec((err, halls) => {
			if (err) {
				res.send('No data found');
			}
			else {
				res.json(halls);
			}
		});
	}
}