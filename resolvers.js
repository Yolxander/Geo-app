const { AuthenticationError, PubSub } = require('apollo-server');
const Pin = require('./models/Pin');

const pubsub = new PubSub();
const PIN_ADDED = 'PIN_ADDED';
const PIN_DELETED = 'PIN_DELETED';

const authenticated = (next) => (root, args, ctx, info) => {
	if (!ctx.currentUser) {
		throw new AuthenticationError('You must be logged in');
	}
	return next(root, args, ctx, info);
};
module.exports = {
	Query: {
		me: authenticated((root, args, ctx) => ctx.currentUser),
		getPins: async (root, args, ctx) => {
			const pins = await Pin.find({})
				// .populate('author')
				.populate('comments.author');
			return pins;
		},
	},

	Mutation: {
		createPin: authenticated(async (root, args, ctx) => {
			const newPin = await new Pin({
				...args.input,
				// author: ctx.currentUser._id,
			}).save();
			const pinAdded = await Pin.populate(newPin, 'author');
			pubsub.publish(PIN_ADDED, { pinAdded });
			return pinAdded;
		}),
		deletePin: authenticated(async (root, args, ctx) => {
			const pinDeleted = await Pin.findOneAndDelete({ _id: args.pinId }).exec();
			pubsub.publish(PIN_DELETED, { pinDeleted });
			return pinDeleted;
		}),
	},
	//update data in real time 
	Subscription: {
		pinAdded: {
			subscribe: () => pubsub.asyncIterator(PIN_ADDED),
		},
		pinDeleted: {
			subscribe: () => pubsub.asyncIterator(PIN_DELETED),
		},
	},
};
