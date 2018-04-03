import mongoose from 'mongoose';
import {HallsSchema, CinemasSchema, FilmsSchema, ShowsSchema} from './schemas.mjs';

let Hall, Cinema, Show, Film;

try {
	Hall = mongoose.model('Hall');
}
catch (err) {
	// The `Hall` model doesn't exist, so need to create it
	Hall = mongoose.model('Hall', HallsSchema);
}

try {
	Cinema = mongoose.model('Cinema');
}
catch (err) {
	// The `Cinema` model doesn't exist, so need to create it
	Cinema = mongoose.model('Cinema', CinemasSchema);
}

try {
	Film = mongoose.model('Film');
}
catch (err) {
// The `Film` model doesn't exist, so need to create it
	Film = mongoose.model('Film', FilmsSchema);
}

try {
	Show = mongoose.model('Show');
}
catch (err) {
// The `Show` model doesn't exist, so need to create it
	Show = mongoose.model('Show', ShowsSchema);
}


export {Hall, Cinema, Film, Show}
