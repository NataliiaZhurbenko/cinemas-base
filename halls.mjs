import mongoose from 'mongoose';
import {HallsSchema, CinemasSchema} from './schemas.mjs';
import {Hall, Cinema} from './models.mjs';

export default class Halls {
	constructor(data=null){
		this._data = data;
	}

	save() {
		let hall = new Hall({
			_id: new mongoose.Types.ObjectId(),
			name: this._data.name,
			capacity: this._data.capacity,
			cinema: this._data.cinema
		});
		
		hall.save((err) => {
			if (err) {
				console.log(err);
			} else {
				Cinema.findById(this._data.cinema, (err, cinema) => {
					cinema.halls.push(hall._id);
					cinema.save();
				});
			}
		});
	}
	
	into(res) {
		Hall.find({}).populate('cinema').exec((err, halls) => {
			if (err) {
				res.send('No data found');
			}
			else {
				res.json(halls);
			}
		});
	}
}