const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	title: { type: String, required: true },
	body: { type: String, required: true },
	author: { type: String, required: true },
	comments: [ { body: String, date: Date } ],
	date: { type: Date, default: Date.now },
	likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Blog', blogSchema);
