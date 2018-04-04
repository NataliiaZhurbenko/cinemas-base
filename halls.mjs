import mongoose from 'mongoose';
import {HallsSchema, CinemasSchema} from './schemas.mjs';
import {Hall, Cinema} from './models.mjs';

export default class Halls {
	constructor(res, data=null){
		this._data = data;
		this._res = res;
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
				this._res.send("Error occured");
				// TODO: Need to send error to log
			} else {
				Cinema.findById(this._data.cinema, (err, cinema) => {
					if (err) {
						this._res.send("Error occured");
						// TODO: Need to send error to log
					} else {
						cinema.halls.push(hall._id);
						cinema.save((err) => {
							if (err) {
								this._res.send("Error occured");
								// TODO: Need to send error to log
							} else {
								this._res.send("Hall was successfully saved");
							}
						});
					}
				});
			}
		});
	}

	filter(params) {
		const cinemaId = params.cinema;
		const filter = (cinemaId ? {cinema: cinemaId} : {});
		Hall.find(filter).select('-__v').populate('cinema', 'name').populate('shows', 'startAt').exec((err, halls) => {
			if (err) {
				this._res.send('No data found');
			}
			else {
				this._res.json(halls);
			}
		});
	}
}