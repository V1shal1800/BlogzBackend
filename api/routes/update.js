const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Blog = require('../models/blog');

router.patch('/:blogId/likes', (req, res, next) => {
	const _id = req.params.blogId;
    likes = req.body.likes;
	Blog.update({ _id }, { likes: (likes+1) })
		.exec()
		.then((result) => {
			res.status(200).json({
                message: 'Blog Updated',
                likes: likes+1
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

module.exports = router;