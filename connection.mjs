import mongoose from 'mongoose';

const DB_URI = 'mongodb://ds249025.mlab.com:49025/cinemas-base';
const DB_USER = 'admin';
const DB_PASSWORD = '37ab967';


export default class Connection {
	constructor() {
		//Connects to the  cinemas database
		mongoose.connect(DB_URI, { auth: { user: DB_USER, password: DB_PASSWORD } });
	}
}
