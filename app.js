const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const blogRoutes = require('./api/routes/blogs');

mongoose.connect('mongodb+srv://Admin:NewBlogz@cluster0-0xnpl.mongodb.net/<dbname>?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
mongoose.promise = global.promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Header', 'GET, PUT, POST, PATCH, DELETE');
		return res.status(200).json({});
	}
	next();
});

app.use('/blogs', blogRoutes);

app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
