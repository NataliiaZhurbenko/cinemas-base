import mongoose from 'mongoose';
import {ShowsSchema, FilmsSchema, HallsSchema} from './schemas.mjs';
import {Show, Film, Hall} from './models.mjs';

export default class Shows {
	constructor(res, data=null){
		this._data = data;
		this._res = res;
	}
	
	save() {
		let show = new Show({
			_id: new mongoose.Types.ObjectId(),
			startAt: Date.parse(this._data.startAt),
			film: this._data.film,
			hall: this._data.hall
		});
		
		show.save((err) => {
			if (err) {
				this._res.send("Error occured");
				// TODO: Need to send error to log
			} else {
				Film.findById(this._data.film, (err, film) => {
					if (err) {
						this._res.send("Error occured");
						// TODO: Need to send error to log
					} else {
						film.shows.push(show._id);
						film.save((err) => {
							if (err) {
								this._res.send("Error occured");
								// TODO: Need to send error to log
							}
						});
					}
				});
				
				Hall.findById(this._data.hall, (err, hall) => {
					if (err) {
						this._res.send("Error occured");
						// TODO: Need to send error to log
					} else {
						hall.shows.push(show._id);
						hall.save((err) => {
							if (err) {
								this._res.send("Error occured");
								// TODO: Need to send error to log
							} else {
								this._res.send("Show was successfully saved");
							}
						});
					}
				});
			}
		})
	}
	
	into() {
		Show.find({}).select('-__v').populate('film', 'name').populate('hall', 'name').exec((err, shows) => {
			if (err) {
				this._res.send('No data found');
			}
			else {
				this._res.json(shows);
			}
		});
	}
}