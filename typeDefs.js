const { gql } = require('apollo-server');

///create the scheema we want in the project
module.exports = gql`
	type User {
		_id: ID
		name: String
		email: String
		picture: String
	}

	type Pin {
		_id: ID
		createdAt: String
		title: String
		content: String
		image: String
		latitude: Float
		longitude: Float
		author: String
		comments: [Comment]
	}

	type Comment {
		text: String
		createdAt: String
		author: User
	}

	input CreatePinInput {
		title: String
		image: String
		content: String
		latitude: Float
		longitude: Float
		author:String
	}

	type Query {
		me: User
		getPins: [Pin!]
	}

	type Mutation {
		createPin(input: CreatePinInput!): Pin
		deletePin(pinId: ID!): Pin
		createComment(pinId: ID!, text: String!): Pin
	}

	type Subcription{
		pindAdded: Pin
		pinDeleted: Pin
	}
`;
