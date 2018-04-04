import mongoose from 'mongoose';
import {ShowsSchema, FilmsSchema} from './schemas.mjs';
import {Show, Film} from './models.mjs';

export default class Shows {
	constructor(res, data=null){
		this._data = data;
		this._res = res;
	}
	
	save() {
		let show = new Show({
			_id: new mongoose.Types.ObjectId(),
			startAt: Date.parse(this._data.startAt),
			film: this._data.film
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
		Show.find({}).select('-__v').populate('film', 'name').exec((err, shows) => {
			if (err) {
				this._res.send('No data found');
			}
			else {
				this._res.json(shows);
			}
		});
	}
}