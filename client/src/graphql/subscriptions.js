import gql from 'graphql-tag';

export const PIN_ADDED_SUBSCRIPTION = gql`
	subscription {
		pinAdded {
			_id
			createdAt
			title
			image
			content
			latitude
			longitude
			author 
			
		}
	}
`;


export const PIN_DELETED_SUBSCRIPTION = gql`
	subscription {
		pinDeleted {
			_id
		}
	}
`;
