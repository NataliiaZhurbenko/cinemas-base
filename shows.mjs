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
	
	filter(params) {
		const hallId = params.hall;
		const filter = (hallId ? {hall: hallId} : {});
		Show.find(filter).select('-__v').populate('film', 'name').populate('hall', 'name cinema')
			.exec((err, shows) => {
				if (err) {
					this._res.send('No data found');
				}
				else {
					let result = shows;
					if (params.date) {
						const date = new Date(params.date);
						result = result.filter((show) => {
							return (
								(show.startAt.getYear() == date.getYear()) &&
								(show.startAt.getMonth() == date.getMonth()) &&
								(show.startAt.getDay() == date.getDay())
							);
						});
					}
					if (params.cinema) {
						result = result.filter((show) => {
							return (show.hall && (show.hall.cinema == params.cinema));
						});
					}
					this._res.json(result);
				}
		});
	}
}