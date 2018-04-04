import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

 
const CinemasSchema = new Schema({
	_id: ObjectId,
	name: String,
	city: String,
	halls: [{type:ObjectId, ref: 'Hall'}]
});

const HallsSchema = new Schema({
	_id: ObjectId,
	name: String,
	capacity: Number,
	cinema: {type:ObjectId, ref: 'Cinema'},
	shows: [{type:ObjectId, ref: 'Show'}]
});

const FilmsSchema = new Schema({
	_id: ObjectId,
	name: String,
	year: Number,
	duration: Number,
	shows: [{type:ObjectId, ref: 'Show'}]
});

const ShowsSchema = new Schema({
	_id: ObjectId,
	startAt: Date,
	film: {type:ObjectId, ref: 'Film'},
	hall: {type:ObjectId, ref: 'Hall'}
});

export {CinemasSchema, HallsSchema, FilmsSchema, ShowsSchema};