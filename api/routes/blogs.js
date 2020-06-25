const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Blog = require('../models/blog');

router.get('/', (req, res, next) => {
	Blog.find()
		.sort({ _id: -1 })
		.exec()
		.then((docs) => {
			const response = {
				count: docs.length,
				blogs: docs
			};
			res.status(200).json(response);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

router.get('/:blogId', (req, res, next) => {
	const _id = req.params.blogId;
	Blog.findById(_id)
		.select('title body author comments date likes _id')
		.exec()
		.then((doc) => {
			console.log('From Database', doc);
			if (doc) {
				res.status(200).json({
					blog: doc
				});
			} else {
				res.status(404).json({
					message: 'No Valid Entry for the Given ID'
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

router.post('/', (req, res, next) => {
	const blog = new Blog({
		_id: new mongoose.Types.ObjectId(),
		title: req.body.title,
		body: req.body.body,
		author: req.body.author,
		comments: req.body.comments,
		date: req.body.date,
		likes: req.body.likes
	});
	blog
		.save()
		.then((result) => {
			res.status(201).json({
				createdBlog: {
					title: result.title,
					author: result.author,
					_id: result._id
				}
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

router.patch('/:blogId', (req, res, next) => {
	const _id = req.params.blogId;
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
		console.log(ops.propName, ops.value);
	}
	Blog.update({ _id }, { $set: updateOps })
		.exec()
		.then((result) => {
			res.status(200).json({
				message: 'Blog Updated'
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

router.delete('/:blogId', (req, res, next) => {
	const _id = req.params.blogId;
	Blog.remove({ _id })
		.exec()
		.then((result) => {
			res.status(200).json({
				message: 'Blog Deleted'
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
