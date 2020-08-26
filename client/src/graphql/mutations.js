export const CREATE_PIN_MUTATION = `
  mutation($title: String!, $image: String!, $content: String!,$author:String!, $latitude: Float!, $longitude: Float!,) {
    createPin(input: {
      title: $title,
      image: $image,
      content: $content,
      latitude: $latitude,
      longitude: $longitude,
      author: $author,
    }) {
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

export const DELETE_PIN_MUTATION = `
  mutation($pinId: ID!) {
    deletePin(pinId: $pinId) {
      _id
    }
  }
`;

