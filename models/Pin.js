const mongoose = require('mongoose');

const PinSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		image: String,
		latitude: Number,
		longitude: Number,
		author: String,
		comments: [
			{
				text: String,
				createdAt: { type: Date, default: Date.now },
				author: { type: mongoose.Schema.ObjectId, ref: 'User' },
			},
		],
		//this track whenever the pin is updated
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Pin', PinSchema);
